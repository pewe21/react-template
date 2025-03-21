import { AppSidebar } from "@/components/app-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

import { DataTable } from "@/components/datatable";

import { Button } from "@/components/ui/button";
import { openCreateModal } from "@/app/features/publisherSlice";
import { PlusCircle } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchPublishers } from "@/app/actions/publisherAction";
import { publisherColumns } from "./column";
import { DialogCreateEditPublisher } from "./dialogCreateEdit";
import { DeleteDialog } from "./deleteDialog";

export default function Publisher() {
  const { loading, publishers } = useSelector(
    (state: RootState) => state.publisher
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPublishers());
  }, [dispatch, fetchPublishers]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch(openCreateModal({ isOpenModal: true }));
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOpenCreateModal = () => {
    dispatch(openCreateModal({ isOpenModal: true }));
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Masters</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Publisher</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="p-5">
            <h1 className="text-2xl font-bold">Publisher</h1>
            <div className="mt-7">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" onClick={handleOpenCreateModal}>
                      <PlusCircle />
                      Create
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Form Create Publisher | ctrl + c</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DialogCreateEditPublisher />
              <DeleteDialog />

              {loading ? (
                <Skeleton className="mt-5 h-[225px] w-full rounded-xl" />
              ) : (
                <DataTable columns={publisherColumns} data={publishers} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
