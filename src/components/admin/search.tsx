// "use client";

// import { useState } from "react";
// import { Search as SearchIcon, Filter, SortDesc } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// interface SearchProps {
//   title: string;
//   onSearch: (query: string) => void;
//   showFilter?: boolean;
//   showSort?: boolean;
//   filterContent?: React.ReactNode;
//   sortContent?: React.ReactNode;
// }

// export default function Search({
//   title,
//   onSearch,
//   showFilter = false,
//   showSort = false,
//   filterContent,
//   sortContent,
// }: SearchProps) {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     onSearch(searchQuery);
//   };

//   return (
//     <div className="flex items-center justify-between space-x-4 p-4">
//       <h1 className="text-2xl font-bold">{title}</h1>
//       <div className="flex items-center space-x-2">
//         <form onSubmit={handleSearch} className="relative">
//           <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-8 pr-4"
//           />
//         </form>
//         {showFilter && (
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <Filter className="h-4 w-4" />
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Filter</DialogTitle>
//               </DialogHeader>
//               {filterContent}
//             </DialogContent>
//           </Dialog>
//         )}
//         {showSort && (
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <SortDesc className="h-4 w-4" />
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Sort</DialogTitle>
//               </DialogHeader>
//               {sortContent}
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>
//     </div>
//   );
// }
