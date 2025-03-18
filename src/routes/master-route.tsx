import Book from "@/page/book";
import ProtectedRoute from "./Protected";
import Publisher from "@/page/publisher";

export const masterRouter = [
  {
    path: "master/book",
    element: (
      <ProtectedRoute>
        <Book />,
      </ProtectedRoute>
    ),
  },
  {
    path: "master/publisher",
    element: (
      <ProtectedRoute>
        <Publisher />,
      </ProtectedRoute>
    ),
  },

  {
    path: "master/product",
    element: (
      <ProtectedRoute>
        <Publisher />,
      </ProtectedRoute>
    ),
  },
];
