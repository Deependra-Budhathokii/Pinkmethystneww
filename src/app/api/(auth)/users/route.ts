import connect from "@/lib/dbConnect";
import User from "@/lib/models/users";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Helper function to generate JWT token
const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// Helper function to upload image to Cloudinary
async function uploadImage(base64Image: string) {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "users",
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

// Handle login and registration
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { action, password, image, role, ...userData } = body;

    await connect();

    // Handle Login
    if (action === "login") {
      const user = await User.findOne({ email: userData.email });

      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid credentials" }),
          {
            status: 401,
          }
        );
      }

      // Check role for admin login
      if (body.isAdminLogin && user.role !== "admin") {
        return new NextResponse(
          JSON.stringify({ message: "Unauthorized access" }),
          {
            status: 403,
          }
        );
      }

      // Generate JWT token
      const token = generateToken(user);

      return new NextResponse(
        JSON.stringify({
          message: "Login successful",
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
            district: user.address.district,
            province: user.address.province,
            city: user.address.city,
            street: user.address.street,
            landmark: user.address.landmark,
            phone: user.phone,
          },
          token,
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
          },
        }
      );
    }

    // Handle Registration
    if (action === "register") {
      // Check if email already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return new NextResponse(
          JSON.stringify({ message: "Email already registered" }),
          {
            status: 409,
          }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle image upload if provided
      let imageUrl;
      if (image) {
        try {
          imageUrl = await uploadImage(image);
        } catch (error) {
          return new NextResponse("Error uploading image: " + error, {
            status: 500,
          });
        }
      }

      // Determine the role based on registration path
      const userRole = body.isAdminRegistration ? "admin" : "user";

      // Create new user
      const newUser = new User({
        ...userData,
        password: hashedPassword,
        image: imageUrl,
        role: userRole, // Set role based on registration type
      });

      await newUser.save();

      // Generate JWT token
      const token = generateToken(newUser);

      return new NextResponse(
        JSON.stringify({
          message: `${
            userRole === "admin" ? "Admin" : "User"
          } registered successfully`,
          user: {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            image: newUser.image,
          },
          token,
        }),
        {
          status: 201,
          headers: {
            "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
          },
        }
      );
    }

    return new NextResponse(JSON.stringify({ message: "Invalid action" }), {
      status: 400,
    });
  } catch (error: any) {
    return new NextResponse("Error: " + error.message, {
      status: 500,
    });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: { userId?: string } }
) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    await connect();

    if (userId) {
      const user = await User.findById(userId, { password: 0 });

      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }

      return new NextResponse(JSON.stringify(user), { status: 200 });
    }

    // If no user ID, fetch all users
    const users = await User.find({}, { password: 0 });
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching user(s): " + error.message, {
      status: 500,
    });
  }
};

// Update user
export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    await connect();

    if (!userId || !updates) {
      return new NextResponse(
        JSON.stringify({ message: "User ID and updates are required" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User ID" }), {
        status: 400,
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const allowedFields = [
      "name",
      "email",
      "phone",
      "address",
      "password",
      "image",
    ];
    const filteredUpdates: Record<string, any> = {};

    // Handle password update
    if (updates.password) {
      // Validate current password
      if (!updates.currentPassword) {
        return new NextResponse(
          JSON.stringify({ message: "Current password is required" }),
          { status: 400 }
        );
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        updates.currentPassword,
        user.password
      );

      if (!isCurrentPasswordValid) {
        return new NextResponse(
          JSON.stringify({ message: "Current password is incorrect" }),
          { status: 400 }
        );
      }
      const isSamePassword = await bcrypt.compare(
        updates.password,
        user.password
      );
      if (isSamePassword) {
        return new NextResponse(
          JSON.stringify({
            message: "New password cannot be the same as the current password",
          }),
          { status: 400 }
        );
      }
      filteredUpdates.password = await bcrypt.hash(updates.password, 10);
    }

    // Handle image update
    if (updates.image) {
      try {
        const imageUrl = await uploadImage(updates.image);
        filteredUpdates.image = imageUrl;
      } catch (error) {
        return new NextResponse("Error uploading image: " + error, {
          status: 500,
        });
      }
    }

    // Handle other fields
    for (const key of Object.keys(updates)) {
      if (
        allowedFields.includes(key) &&
        key !== "password" &&
        key !== "image" &&
        key !== "currentPassword"
      ) {
        filteredUpdates[key] = updates[key];
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No valid fields to update" }),
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating user: " + error.message, {
      status: 500,
    });
  }
};

// Delete user
export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "User ID required" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User ID" }), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Delete user's image from Cloudinary if it exists
    if (user.image) {
      try {
        const publicId = user.image.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`users/${publicId}`);
        }
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfully",
        user: deletedUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting user: " + error.message, {
      status: 500,
    });
  }
};
