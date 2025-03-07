import Book from "@/page/book";
import ProtectedRoute from "./Protected";

export const masterRouter = [
  {
    path: "master/book",
    element: (
      <ProtectedRoute>
        <Book />,
      </ProtectedRoute>
    ),
  },
];
