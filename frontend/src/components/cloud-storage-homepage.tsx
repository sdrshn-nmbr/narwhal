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
  Maximize2,
  Minimize2,
  Send,
  PlusCircle,
  Bot,
  Play,
  Pause,
  RefreshCw,
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
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

function ThemeToggle() {
  const { setTheme, theme } = useTheme();

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
  );
}

export default function Component() {
  const router = useRouter();
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
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = React.useState(false);
  const [newNoteContent, setNewNoteContent] = React.useState("");
  const [newNoteType, setNewNoteType] = React.useState<"plain" | "markdown">(
    "plain"
  );
  const [isFullPageEditor, setIsFullPageEditor] = React.useState(false);
  const [agents, setAgents] = React.useState([
    {
      id: "1",
      name: "Research Agent",
      status: "idle",
      description: "Conducts in-depth research on various topics",
    },
    {
      id: "2",
      name: "Scheduling Agent",
      status: "active",
      description: "Manages your calendar and schedules meetings",
    },
  ]);
  const [isCreatingAgent, setIsCreatingAgent] = React.useState(false);
  const [newAgentName, setNewAgentName] = React.useState("");
  const [newAgentDescription, setNewAgentDescription] = React.useState("");
  const [activeTask, setActiveTask] = React.useState<{
    name: string;
    status: string;
  } | null>(null);
  const [messages, setMessages] = React.useState<Array<{
    type: "user" | "assistant";
    content: string;
    timestamp: Date;
  }>>([
    {
      type: "assistant",
      content: "Hi! I'm Narwhal, your AI assistant. I can help you manage and understand your files. What would you like to know?",
      timestamp: new Date(),
    },
  ]);

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
    setAiResponse(
      `Creating a Research Agent to find the latest trends in renewable energy...`
    );
    setActiveTask({ name: "Renewable Energy Research", status: "In Progress" });

    setTimeout(() => {
      setAiResponse(`Here are the latest trends in renewable energy:
    1. Green Hydrogen: Increasing focus on hydrogen produced from renewable sources.
    2. Advanced Energy Storage: Development of more efficient and sustainable battery technologies.
    3. Floating Solar Farms: Expansion of solar installations on water bodies.
    4. AI in Energy Management: Using artificial intelligence to optimize energy distribution and consumption.
    5. Blockchain in Energy Trading: Implementing blockchain for peer-to-peer renewable energy trading.

    Would you like more detailed information on any of these trends?`);
      setActiveTask(null);
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadFiles(Array.from(event.target.files));
    }
  };

  const handleFileAction = (action: string, file: any) => {
    console.log(`${action} action triggered for file: ${file.name}`);
  };

  const handleCreateNewFolder = () => {
    if (newFolderName.trim()) {
      console.log(`Creating new folder: ${newFolderName}`);
      setIsNewFolderDialogOpen(false);
      setNewFolderName("");
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i <= 100; i++) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    console.log(`Uploading ${uploadFiles.length} files`);

    setIsUploading(false);
    setUploadProgress(0);
    setUploadFiles([]);
    setIsUploadDrawerOpen(false);
  };

  const handleCreateNewNote = () => {
    console.log(`Creating new ${newNoteType} note:`, newNoteContent);
    setIsNewNoteDialogOpen(false);
    setNewNoteContent("");
    setIsFullPageEditor(false);
  };

  const toggleFullPageEditor = () => {
    setIsFullPageEditor(!isFullPageEditor);
  };

  const handleLogout = () => {
    router.push('/auth/login');
  };

  const renderAIAssistantDialog = () => (
    <Dialog open={isAIAssistantOpen} onOpenChange={setIsAIAssistantOpen}>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Narwhal</DialogTitle>
          <DialogDescription>
            Chat with your AI assistant and manage your AI agents.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-[600px]">
          <div className="w-64 border-r p-4 hidden md:block">
            <h3 className="font-semibold mb-4">AI Agents</h3>
            <div className="space-y-2">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.status}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" onClick={() => setIsCreatingAgent(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Agent
            </Button>
          </div>
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    <p>Hello! How can I assist you today?</p>
                  </div>
                </div>
                {aiResponse && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                      <p>{aiResponse}</p>
                    </div>
                  </div>
                )}
              </div>
              {activeTask && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Active Task: {activeTask.name}</h4>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{activeTask.status}</p>
                  </CardContent>
                </Card>
              )}
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message here..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleAIAssistantQuery}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
                <Button variant="outline">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderAgentCreationDialog = () => (
    <Dialog open={isCreatingAgent} onOpenChange={setIsCreatingAgent}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New AI Agent</DialogTitle>
          <DialogDescription>
            Define the purpose and capabilities of your new AI agent.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newAgentName}
              onChange={(e) => setNewAgentName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={newAgentDescription}
              onChange={(e) => setNewAgentDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setAgents([
                ...agents,
                {
                  id: String(agents.length + 1),
                  name: newAgentName,
                  status: "idle",
                  description: newAgentDescription,
                },
              ]);
              setIsCreatingAgent(false);
              setNewAgentName("");
              setNewAgentDescription("");
            }}
          >
            Create Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r bg-card">
        <div className="p-4">
          <div className="flex items-center mb-4 pl-[14px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-[60px] w-[60px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 18.63 18.84 15.21 18.84 7.68 12 4.32 5.16 7.68 5.16 15.21 12 18.63" />
              <polyline points="5.16 8.09 5.19 8.09 12 11.46 12 18.84" />
              <polyline points="12 18.84 12 11.46 18.81 8.09 18.84 8.09" />
              <polyline points="18.84 8.09 18.81 8.09 12 11.46 5.19 8.09 5.16 8.09" />
              <polyline points="1.25 6.14 1.25 1.25 6.14 1.25" />
              <polyline points="6.14 22.75 1.25 22.75 1.25 17.86" />
              <polyline points="22.75 17.86 22.75 22.75 17.86 22.75" />
              <polyline points="17.86 1.25 22.75 1.25 22.75 6.14" />
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
        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-3">
              <svg className="w-20 h-20 -rotate-90 transform transition-all">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  className="stroke-muted-foreground/10"
                  fill="none"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  className="stroke-primary transition-all"
                  fill="none"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 36}
                  strokeDashoffset={2 * Math.PI * 36 * (1 - 33/100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-lg font-semibold">3.3</span>
                <span className="text-xs font-medium text-muted-foreground">GB</span>
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <p className="text-sm font-medium">Storage Used</p>
              <p className="text-xs text-muted-foreground">6.7 GB Available</p>
            </div>
            <Button className="w-full mt-6">
              Upgrade Storage
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAIAssistantOpen(true)}
                className="w-10 h-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
                  <path d="M17.8 10.5c0 1.5-3.5 2.8-3.5 2.8s1.5-3.5 3.5-2.8z" />
                  <path d="M6.2 10.5c0 1.5 3.5 2.8 3.5 2.8s-1.5-3.5-3.5-2.8z" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <path d="M12 16s1.5 2 3.5 2-3.5-2-3.5-2z" />
                </svg>
              </Button>
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
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

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

      {renderAIAssistantDialog()}
      {renderAgentCreationDialog()}

      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-14"
          onClick={() => setIsNewNoteDialogOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <Dialog open={isNewNoteDialogOpen} onOpenChange={setIsNewNoteDialogOpen}>
        <DialogContent
          className={cn(
            "transition-all duration-300",
            isFullPageEditor ? "w-screen h-screen max-w-full" : "sm:max-w-[800px]"
          )}
        >
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Write your note in plain text or markdown format.
            </DialogDescription>
          </DialogHeader>
          <Tabs
            defaultValue="plain"
            onValueChange={(value) =>
              setNewNoteType(value as "plain" | "markdown")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="plain">Plain Text</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
            </TabsList>
            <TabsContent value="plain">
              <Textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="min-h-[200px]"
                placeholder="Start typing your note here..."
              />
            </TabsContent>
            <TabsContent value="markdown">
              <Textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="min-h-[200px]"
                placeholder="Start typing your markdown here..."
              />
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button onClick={toggleFullPageEditor}>
              {isFullPageEditor ? (
                <Minimize2 className="mr-2 h-4 w-4" />
              ) : (
                <Maximize2 className="mr-2 h-4 w-4" />
              )}
              {isFullPageEditor ? "Minimize" : "Expand"}
            </Button>
            <Button onClick={handleCreateNewNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
