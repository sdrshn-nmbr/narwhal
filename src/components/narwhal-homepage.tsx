"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Grid,
  List,
  LogOut,
  Mic,
  Moon,
  Plus,
  Search,
  Settings,
  Share,
  Star,
  Sun,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function NarwhalHomepageComponent() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
  const [aiQuery, setAiQuery] = React.useState("");
  const [aiResponse, setAiResponse] = React.useState("");
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = React.useState(false);
  const [uploadFiles, setUploadFiles] = React.useState<File[]>([]);
  const [currentDirectory, setCurrentDirectory] = React.useState([
    "Home",
    "Documents",
    "Projects",
  ]);
  const [newFolderName, setNewFolderName] = React.useState("");
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] =
    React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const files = [
    {
      id: "1",
      name: "Project Proposal.docx",
      type: "document",
      size: "2.5 MB",
      modified: "2023-11-15",
      owner: "You",
    },
    {
      id: "2",
      name: "Financial Report.xlsx",
      type: "spreadsheet",
      size: "4.2 MB",
      modified: "2023-11-14",
      owner: "John Doe",
    },
    {
      id: "3",
      name: "Presentation.pptx",
      type: "presentation",
      size: "8.7 MB",
      modified: "2023-11-13",
      owner: "You",
    },
    {
      id: "4",
      name: "Team Photo.jpg",
      type: "image",
      size: "3.1 MB",
      modified: "2023-11-12",
      owner: "Jane Smith",
    },
  ];

  const handleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleAIAssistantQuery = () => {
    // Simulating AI response. In a real application, this would call an API endpoint.
    setAiResponse(`Here's what I found based on your query "${aiQuery}":
    1. The file "Project Proposal.docx" contains information related to your query.
    2. "Financial Report.xlsx" has some relevant data in the 'Q4 Summary' sheet.
    3. I've also found a mention of this topic in "Presentation.pptx" on slide 7.
    Would you like me to summarize any of these documents for you?`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadFiles(Array.from(event.target.files));
    }
  };

  const handleFileAction = (action: string, file: any) => {
    // Placeholder for file actions
    console.log(`${action} action triggered for file: ${file.name}`);
    // Implement actual functionality here
  };

  const handleCreateNewFolder = () => {
    if (newFolderName.trim()) {
      // Here you would typically make an API call to create the folder
      console.log(`Creating new folder: ${newFolderName}`);
      // Update the UI to show the new folder
      // For this example, we'll just close the dialog and reset the input
      setIsNewFolderDialogOpen(false);
      setNewFolderName("");
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulating file upload process
    for (let i = 0; i <= 100; i++) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust the timeout for smoother or faster animation
    }

    // Here you would typically make an API call to upload the files
    console.log(`Uploading ${uploadFiles.length} files`);

    setIsUploading(false);
    setUploadProgress(0);
    setUploadFiles([]);
    setIsUploadDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-card">
        <div className="p-4">
          <div className="flex items-center mb-4 pl-4">
            <svg
              stroke-width="1.5"
              viewBox="0 0 24 24"
              className="w-12 h-12"
            >
              <defs>
                <style>{`.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;}`}</style>
              </defs>
              <polygon
                className="cls-1"
                points="12 18.63 18.84 15.21 18.84 7.68 12 4.32 5.16 7.68 5.16 15.21 12 18.63"
              />
              <polyline
                className="cls-1"
                points="5.16 8.09 5.19 8.09 12 11.46 12 18.84"
              />
              <polyline
                className="cls-1"
                points="12 18.84 12 11.46 18.81 8.09 18.84 8.09"
              />
              <polyline
                className="cls-1"
                points="18.84 8.09 18.81 8.09 12 11.46 5.19 8.09 5.16 8.09"
              />
              <polyline
                className="cls-1"
                points="1.25 6.14 1.25 1.25 6.14 1.25"
              />
              <polyline
                className="cls-1"
                points="6.14 22.75 1.25 22.75 1.25 17.86"
              />
              <polyline
                className="cls-1"
                points="22.75 17.86 22.75 22.75 17.86 22.75"
              />
              <polyline
                className="cls-1"
                points="17.86 1.25 22.75 1.25 22.75 6.14"
              />
            </svg>
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              My Files
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Shared with Me
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Star className="mr-2 h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trash2 className="mr-2 h-4 w-4" />
              Trash
            </Button>
          </nav>
        </div>
        <Separator />
        <div className="p-4">
          <h3 className="text-sm font-medium mb-2">Storage</h3>
          <Progress value={33} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">3.3 GB of 10 GB used</p>
        </div>
        <div className="p-4">
          <Button className="w-full">Upgrade Plan</Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center flex-1">
              <Input
                type="search"
                placeholder="Search files..."
                className="w-full max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Quick Access Bar */}
        <div className="bg-background p-4 border-b flex items-center justify-between">
          <div className="flex space-x-2">
            <Drawer
              open={isUploadDrawerOpen}
              onOpenChange={setIsUploadDrawerOpen}
            >
              <DrawerTrigger asChild>
                <Button onClick={() => setIsUploadDrawerOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Upload Files</DrawerTitle>
                    <DrawerDescription>
                      Choose files to upload to your cloud storage.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="flex items-center justify-center w-full">
                      <Label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <Input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileUpload}
                        />
                      </Label>
                    </div>
                    {uploadFiles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Selected Files:
                        </h4>
                        <Carousel className="w-full max-w-xs mx-auto">
                          <CarouselContent>
                            {Array.from({
                              length: Math.ceil(uploadFiles.length / 5),
                            }).map((_, index) => (
                              <CarouselItem key={index}>
                                <div className="grid grid-cols-5 gap-2">
                                  {uploadFiles
                                    .slice(index * 5, (index + 1) * 5)
                                    .map((file, fileIndex) => (
                                      <div
                                        key={fileIndex}
                                        className="flex flex-col items-center"
                                      >
                                        <FileText className="h-8 w-8 text-blue-500" />
                                        <p className="text-xs text-center mt-1 truncate w-full">
                                          {file.name}
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    )}
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                      <Label htmlFor="upload-folder">Upload to folder</Label>
                      <Select>
                        <SelectTrigger id="upload-folder">
                          <SelectValue placeholder="Select a folder" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="my-files">My Files</SelectItem>
                          <SelectItem value="shared">Shared</SelectItem>
                          <SelectItem value="recent">Recent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DrawerFooter>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading || uploadFiles.length === 0}
                        className="flex-1"
                      >
                        {isUploading ? "Uploading..." : "Upload Files"}
                      </Button>
                      {isUploading && (
                        <div className="relative h-10 w-10">
                          <Progress
                            value={uploadProgress}
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-semibold">
                              {uploadProgress}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            <Dialog
              open={isNewFolderDialogOpen}
              onOpenChange={setIsNewFolderDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setIsNewFolderDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                  <DialogDescription>
                    Enter a name for your new folder. Click create when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateNewFolder}>
                    Create folder
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Name</DropdownMenuItem>
                <DropdownMenuItem>Date modified</DropdownMenuItem>
                <DropdownMenuItem>Size</DropdownMenuItem>
                <DropdownMenuItem>Type</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-background px-4 py-2 border-b">
          <Breadcrumb>
            <BreadcrumbList>
              {currentDirectory.map((dir, index) => (
                <React.Fragment key={index}>
                  {index === currentDirectory.length - 1 ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{dir}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">{dir}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* File Display Area */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files.map((file) => (
                  <ContextMenu key={file.id}>
                    <ContextMenuTrigger>
                      <Card className="cursor-pointer hover:bg-accent">
                        <CardContent className="p-4 flex flex-col items-center">
                          <FileText className="h-12 w-12 mb-2" />
                          <h3 className="font-medium text-center">
                            {file.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {file.size}
                          </p>
                        </CardContent>
                      </Card>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        onSelect={() => handleFileAction("open", file)}
                      >
                        Open/View
                      </ContextMenuItem>
                      <ContextMenuItem
                        onSelect={() => handleFileAction("download", file)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </ContextMenuItem>
                      <ContextMenuItem
                        onSelect={() => handleFileAction("share", file)}
                      >
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </ContextMenuItem>
                      <ContextMenuItem
                        onSelect={() => handleFileAction("move", file)}
                      >
                        Move
                      </ContextMenuItem>
                      <ContextMenuItem
                        onSelect={() => handleFileAction("delete", file)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Last modified</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedFiles.includes(file.id)}
                          onCheckedChange={() => handleFileSelection(file.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {file.name}
                        </div>
                      </TableCell>
                      <TableCell>{file.owner}</TableCell>
                      <TableCell>{file.modified}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() => handleFileAction("open", file)}
                            >
                              Open/View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() =>
                                handleFileAction("download", file)
                              }
                            >
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => handleFileAction("share", file)}
                            >
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => handleFileAction("move", file)}
                            >
                              Move
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => handleFileAction("delete", file)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </ScrollArea>
      </main>

      {/* AI Assistant Button and Panel */}
      <Sheet open={isAIAssistantOpen} onOpenChange={setIsAIAssistantOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full h-12 w-12"
            size="icon"
            onClick={() => setIsAIAssistantOpen(true)}
          >
            <Search className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>AI Assistant</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask away!"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
              />
              <Button onClick={handleAIAssistantQuery}>
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            {aiResponse && (
              <Card>
                <CardContent className="p-4">
                  <p className="whitespace-pre-line">{aiResponse}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
