# Narwhal Cloud Storage - Backend Architecture Plan

## Project Overview

Narwhal is a modern cloud storage platform that combines traditional file storage capabilities with AI-powered features. It provides users with a seamless experience for managing their files while leveraging artificial intelligence to help organize, understand, and work with their data more effectively.

### Key Features

- Secure file storage and management
- AI-powered file analysis and organization
- Intelligent agents for task automation
- Real-time collaboration
- Advanced file search and metadata extraction
- Multi-platform support
- Granular access controls

## Tech Stack

### Frontend

- **Next.js 13+**: Server-side rendering, routing, and API routes
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Pre-built accessible components
- **Framer Motion**: Smooth animations and transitions

### Backend

- **FastAPI**: High-performance async Python web framework
- **Python 3.10+**: Latest Python features and performance improvements
- **Pydantic**: Data validation and settings management
- **HTTPX**: Async HTTP client for service communication
- **asyncpg**: High-performance PostgreSQL client
- **pgvector**: Vector similarity search extension

### Storage & Database (Supabase)

- **Supabase Storage**: S3-compatible object storage

  - Multiple access protocols (REST, TUS, S3)
  - Resumable uploads via TUS
  - Built-in Row Level Security (RLS)
  - Cross-bucket transfers
  - Automatic file versioning
  - Direct S3-compatible API access
  - Integration with data analysis tools
  - Built-in CDN and caching

- **Supabase Postgres**: Primary database for all data
  - User profiles and authentication
  - File/folder metadata and structure
  - Vector embeddings for RAG (pgvector)
  - Agent states and configurations
  - Chat history and context
  - Analytics and metrics
  - JSONB for semi-structured data
  - Full-text search (tsvector)
  - Point-in-time recovery
  - Automatic backups
  - Built-in connection pooling
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Performance monitoring
  - Auto-vacuuming

### Authentication

- **Supabase Auth**: Primary authentication system

  - Session management with JWT tokens
  - Cookie-based auth for Next.js
  - Built-in user management
  - Multiple auth providers support
  - Row Level Security (RLS)
  - Real-time session handling

- **Google OAuth Provider**
  - Integrated through Supabase Auth
  - Single Sign-On (SSO)
  - Profile synchronization

### Auth Implementation

### Components

1. **Authentication Service**

   - **Session Management**

     - JWT tokens with 15-minute expiry
     - Refresh token rotation every 24 hours
     - Cookie-based session persistence
     - Redis-backed session store

   - **OAuth Integration**

     ```typescript
     // middleware.ts - Protected routes
     export const middleware = createMiddleware({
       auth: {
         persistSession: true,
         cookieOptions: {
           name: "sb-session",
           secure: true,
         },
       },
     });
     ```

   - **Client Implementation**

     ```typescript
     // auth/login.tsx - Client-side auth
     "use client";
     export default function Login() {
       const supabase = createClientComponentClient();

       const signInWithGoogle = async () => {
         await supabase.auth.signInWithOAuth({
           provider: "google",
           options: {
             redirectTo: `${location.origin}/auth/callback`,
           },
         });
       };
     }
     ```

   - **Database Integration**

     ```sql
     -- User creation trigger
     CREATE FUNCTION public.handle_new_user()
     RETURNS TRIGGER AS $$
     BEGIN
       INSERT INTO public.user_profiles (id, email)
       VALUES (NEW.id, NEW.email);
       RETURN NEW;
     END;
     $$ LANGUAGE plpgsql SECURITY DEFINER;

     CREATE TRIGGER on_auth_user_created
       AFTER INSERT ON auth.users
       FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
     ```

   - **Security Features**
     - RBAC with database policies
     - Audit logging
     - Rate limiting
     - Brute force protection
     - CORS configuration
     - Session invalidation rules

### AI Stack

- **OpenAI**: GPT-4o for natural language understanding
- **ColQwen-VL**: Multimodal embeddings via Modal
- **CrewAI**: Multi-agent orchestration framework
- **LangGraph**: Agent workflow management
- **LangChain**: AI/LLM application framework

## System Architecture

### Core Components

1. **Authentication Service**

   - Google Auth integration for secure login
   - JWT token management with refresh token rotation
   - Session handling with Redis for fast access
   - User profile synchronization with Google
   - Role-based access control (RBAC)
   - Security audit logging

2. **File Storage Service**

   - Supabase Storage integration
   - Chunked file upload support (default 5MB chunks)
   - Resumable uploads via TUS protocol
   - Presigned URLs for secure direct upload/download
   - Automatic file versioning
   - File deduplication
   - Compression for supported file types
   - Thumbnail generation for images/videos
   - Virus scanning integration
   - Metadata extraction
   - File type validation
   - Quota management

3. **Database Service**
   Supabase Postgres tables with the following purposes:

   - **Users**: User profiles and authentication data
   - **Files**: File metadata and storage info
   - **Folders**: Directory structure and paths
   - **Vectors**: Document embeddings for RAG
   - **Agents**: Agent configurations and state
   - **ChatHistory**: Conversation logs with context
   - **UserPreferences**: Application settings
   - **Sharing**: Access control and collaboration
   - **AuditLogs**: Security and operation logging
   - **Analytics**: Usage statistics and metrics

4. **AI Service**
   - OpenAI integration for natural language processing
   - Agent management using CrewAI
     - File analysis agent
     - Data extraction agent
     - Organization agent
     - Search agent
   - Workflow orchestration with LangGraph
   - File content analysis and tagging
   - Smart search capabilities
   - Document summarization
   - Content categorization
   - Duplicate detection
   - NSFW content detection
   - RAG Implementation:
     - Document chunking and preprocessing
     - Embedding generation using OpenAI embeddings
     - Vector storage in Postgres (pgvector)
     - Hybrid search (keyword + semantic)
     - Context window optimization
     - Source attribution and citations

## API Endpoints

### Auth Endpoints

Built-in Supabase Auth endpoints handle:

- OAuth sign-in flows
- Session management
- Password reset
- Email verification
- User management

Our custom endpoints:

```.
GET  /api/auth/profile
  - Returns extended user profile
  - Includes storage usage
  - Includes preferences

PATCH /api/auth/profile
  - Updates user profile
  - Validates data
  - Updates preferences
```

### File Operations

```.
POST   /api/files/upload
  - Initiates file upload
  - Supports multipart and chunked uploads
  - Returns upload URL and token

GET    /api/files/download/{file_id}
  - Generates presigned download URL
  - Validates permissions
  - Logs access

GET    /api/files/{file_id}
  - Returns file metadata
  - Includes sharing info
  - Includes version history

DELETE /api/files/{file_id}
  - Moves to trash or permanent delete
  - Handles recursive deletion
  - Updates storage quota

PATCH  /api/files/{file_id}
  - Updates file metadata
  - Handles moves/renames
  - Triggers reindexing

GET    /api/files/list
  - Lists files/folders
  - Supports pagination
  - Supports filtering/sorting
  - Optional recursive listing

POST   /api/files/move
  - Moves files between folders
  - Handles permission checks
  - Updates path hierarchies

POST   /api/files/copy
  - Creates file copies
  - Handles deep copying
  - Updates storage quotas

POST   /api/files/share
  - Creates sharing links
  - Sets permissions
  - Sends notifications
```

### Folder Operations

```.
POST   /api/folders/create
  - Creates new folder
  - Sets permissions
  - Initializes metadata

GET    /api/folders/{folder_id}
  - Returns folder metadata
  - Includes sharing info
  - Includes child stats

DELETE /api/folders/{folder_id}
  - Handles recursive deletion
  - Updates storage quota
  - Maintains referential integrity

PATCH  /api/folders/{folder_id}
  - Updates folder metadata
  - Handles moves/renames
  - Updates child paths

GET    /api/folders/list
  - Lists folder contents
  - Supports pagination
  - Optional recursive listing

POST   /api/folders/move
  - Moves folders
  - Updates all child paths
  - Validates permissions
```

### AI Assistant & Agents

```.
POST   /api/ai/chat
  - Processes user messages
  - Triggers relevant agents
  - Returns AI responses

GET    /api/ai/chat/history
  - Returns chat history
  - Supports pagination
  - Includes context

POST   /api/ai/agents/create
  - Creates new agent
  - Sets configuration
  - Initializes state

GET    /api/ai/agents/list
  - Lists available agents
  - Includes status
  - Includes capabilities

POST   /api/ai/agents/{agent_id}/start
  - Starts agent execution
  - Sets up workflow
  - Initializes resources

POST   /api/ai/agents/{agent_id}/stop
  - Stops agent execution
  - Cleans up resources
  - Saves state

GET    /api/ai/agents/{agent_id}/status
  - Returns agent status
  - Includes progress
  - Includes results

DELETE /api/ai/agents/{agent_id}
  - Removes agent
  - Cleans up resources
  - Archives history
```

### User Management

```.
GET    /api/users/profile
  - Returns user profile
  - Includes preferences
  - Includes storage stats

PATCH  /api/users/profile
  - Updates user profile
  - Validates data
  - Syncs with Google

GET    /api/users/storage/usage
  - Returns storage metrics
  - Includes quotas
  - Includes trending

GET    /api/users/preferences
  - Returns user preferences
  - Includes app settings
  - Includes AI preferences

PATCH  /api/users/preferences
  - Updates preferences
  - Validates settings
  - Triggers relevant updates
```

## Database Schema

### Users Table

```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    storage_used BIGINT DEFAULT 0,
    storage_limit BIGINT,
    preferences JSONB DEFAULT '{
        "theme": "system",
        "defaultView": "grid",
        "notifications": {
            "email": true,
            "push": true,
            "desktop": true
        },
        "aiPreferences": {
            "autoAnalyze": true,
            "suggestionsEnabled": true,
            "preferredAgents": []
        }
    }',
    subscription JSONB DEFAULT '{
        "plan": "free",
        "status": "active",
        "features": []
    }',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatically update updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_updated_at();

-- RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id);
```

### Files Table

```sql
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size BIGINT NOT NULL,
    owner_id UUID REFERENCES users(id),
    parent_id UUID REFERENCES files(id),
    path TEXT[] NOT NULL,
    storage_key TEXT NOT NULL,
    shared JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{
        "contentType": null,
        "hash": null,
        "version": 1,
        "thumbnailUrl": null,
        "extracted": {
            "text": null,
            "entities": [],
            "summary": null,
            "language": null
        },
        "ai": {
            "tags": [],
            "categories": [],
            "sentiment": null,
            "nsfw": false
        }
    }',
    versions JSONB DEFAULT '[]',
    stats JSONB DEFAULT '{
        "views": 0,
        "downloads": 0,
        "lastAccessed": null
    }',
    flags JSONB DEFAULT '{
        "isDeleted": false,
        "isFavorite": false,
        "isArchived": false,
        "isEncrypted": false
    }',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for path search
CREATE INDEX idx_files_path ON files USING GIN (path);

-- Index for full-text search
CREATE INDEX idx_files_fts ON files USING GIN (
    to_tsvector('english',
        name || ' ' ||
        coalesce(metadata->>'extracted'->>'text', '') || ' ' ||
        coalesce(metadata->>'ai'->>'tags', '[]')::text
    )
);
```

### Vectors Table

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE vectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES files(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536) NOT NULL,
    metadata JSONB DEFAULT '{
        "pageNumber": null,
        "contentType": null,
        "tokens": 0,
        "language": null
    }',
    search_config JSONB DEFAULT '{
        "weight": 1.0,
        "boost": 1.0,
        "categories": []
    }',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create vector index
CREATE INDEX idx_vectors_embedding ON vectors
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create composite index for file lookups
CREATE INDEX idx_vectors_file_chunk ON vectors(file_id, chunk_index);
```

### Agents Table

```sql
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    owner_id UUID REFERENCES users(id),
    status TEXT DEFAULT 'idle',
    configuration JSONB DEFAULT '{
        "capabilities": [],
        "permissions": [],
        "schedule": null,
        "triggers": [],
        "parameters": {},
        "model": "gpt-4",
        "temperature": 0.7
    }',
    state JSONB DEFAULT '{
        "currentTask": null,
        "progress": 0,
        "error": null,
        "memory": null
    }',
    workflow JSONB DEFAULT '{
        "steps": [],
        "currentStep": 0,
        "results": []
    }',
    stats JSONB DEFAULT '{
        "totalRuns": 0,
        "successfulRuns": 0,
        "averageRuntime": 0,
        "lastError": null
    }',
    last_run TIMESTAMPTZ,
    next_run TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Chat History Table

```sql
CREATE TABLE chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    messages JSONB DEFAULT '[]',
    context JSONB DEFAULT '{
        "currentFolder": null,
        "selectedFiles": [],
        "activeAgents": [],
        "preferences": {}
    }',
    summary TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for text search on messages
CREATE INDEX idx_chat_history_content ON chat_history
USING GIN ((messages::text::tsvector));
```

## Storage Integration

```python
from typing import Dict, List, Optional
from supabase import create_client, Client

class StorageService:
    """Handles file storage operations using Supabase Storage."""

    def __init__(self, url: str, key: str) -> None:
        self.client = create_client(url, key)

    async def get_bucket_size(self, bucket: str) -> int:
        """Get total size of files in bucket."""
        files = await self.client.storage.from_(bucket).list()
        return sum(file.metadata.size for file in files)

    async def create_folder(self, bucket: str, path: str) -> Dict:
        """Create a new folder."""
        return await self.client.storage.from_(bucket).upload(
            f"{path}/.keep",
            b"",
            {"upsert": True}
        )

    async def move_file(self, bucket: str, from_path: str, to_path: str) -> Dict:
        """Move a file to a new location."""
        return await self.client.storage.from_(bucket).move(
            from_path,
            to_path
        )

    async def get_public_url(self, bucket: str, path: str) -> str:
        """Get public URL for a file."""
        return self.client.storage.from_(bucket).get_public_url(path)

    async def get_presigned_url(self, bucket: str, path: str, expires_in: int = 3600) -> str:
        """Get presigned URL for secure file access."""
        return await self.client.storage.from_(bucket).create_signed_url(
            path,
            expires_in
        )
```

## Vector Search Implementation

```python
from typing import Dict, List, Optional
import numpy as np
import vecs
from supabase import create_client, Client
import modal

# Initialize Modal stub for ColQwen
stub = modal.Stub("narwhal-embeddings")

# Base image with Python dependencies
base_image = modal.Image.debian_slim(python_version="3.12").pip_install([
    "git+https://github.com/illuin-tech/colpali.git@782edcd50108d1842d154730ad3ce72476a2d17d",
    "hf_transfer==0.1.8",
    "qwen-vl-utils==0.0.8",
    "torchvision==0.19.1",
])

@stub.cls(
    image=base_image,
    gpu=modal.gpu.A100(size="80GB"),
    container_idle_timeout=300,
    allow_concurrent_inputs=10,
)
class ColQwenEmbeddings:
    def __enter__(self):
        from transformers import AutoModel, AutoTokenizer
        import torch

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = AutoModel.from_pretrained(
            "/model-qwen2-VL-2B-Instruct",
            trust_remote_code=True
        ).to(self.device)
        self.tokenizer = AutoTokenizer.from_pretrained(
            "/model-qwen2-VL-2B-Instruct",
            trust_remote_code=True
        )
        self.model.eval()

    @modal.method()
    def get_embeddings(
        self,
        inputs: List[Dict[str, Union[str, bytes]]],
        batch_size: int = 8
    ) -> List[np.ndarray]:
        """Generate embeddings for text and images."""
        import torch
        from PIL import Image
        import io

        all_embeddings = []

        for i in range(0, len(inputs), batch_size):
            batch = inputs[i:i + batch_size]
            batch_inputs = []

            for item in batch:
                if "image" in item:
                    # Convert bytes to PIL Image
                    image = Image.open(io.BytesIO(item["image"]))
                    text = item.get("text", "")
                    batch_inputs.append({
                        "image": image,
                        "text": text
                    })
                else:
                    batch_inputs.append({
                        "text": item["text"]
                    })

            # Process batch
            with torch.no_grad():
                embeddings = []
                for input_item in batch_inputs:
                    if "image" in input_item:
                        # Multimodal input
                        inputs = self.tokenizer.process_text_and_image(
                            input_item["text"],
                            input_item["image"]
                        )
                    else:
                        # Text-only input
                        inputs = self.tokenizer(
                            input_item["text"],
                            return_tensors="pt"
                        )

                    inputs = {k: v.to(self.device) for k, v in inputs.items()}
                    outputs = self.model(**inputs)
                    embedding = outputs.last_hidden_state.mean(dim=1)
                    embeddings.append(embedding.cpu().numpy())

                all_embeddings.extend(embeddings)

        return all_embeddings

class VectorStore:
    """Handles vector storage and search using Supabase vecs."""

    def __init__(
        self,
        postgres_url: str,
        supabase_url: str,
        supabase_key: str,
        colqwen_client: ColQwenEmbeddings
    ) -> None:
        # Initialize vecs client for vector operations
        self.vx = vecs.create_client(postgres_url)

        # Initialize Supabase client for other operations
        self.supabase = create_client(supabase_url, supabase_key)

        # Initialize ColQwen client
        self.colqwen = colqwen_client

        # Initialize collections
        self.docs = self.vx.get_or_create_collection(
            name="document_embeddings",
            dimension=1536  # ColQwen embeddings dimension
        )

        # Create indexes for better performance
        self.docs.create_index()

    async def store_embeddings(
        self,
        file_id: str,
        texts: List[str],
        images: Optional[List[bytes]] = None,
        metadata: List[Dict] = None
    ) -> None:
        """Store document embeddings using ColQwen."""
        # Prepare inputs for ColQwen
        inputs = []
        for i, text in enumerate(texts):
            input_item = {"text": text}
            if images and i < len(images):
                input_item["image"] = images[i]
            inputs.append(input_item)

        # Generate embeddings using ColQwen
        embeddings = await self.colqwen.get_embeddings.remote(inputs)

        # Prepare vectors for storage
        vectors = []
        for i, (text, embedding) in enumerate(zip(texts, embeddings)):
            # Create unique vector ID
            vector_id = f"{file_id}_{i}"

            # Combine metadata
            meta = metadata[i] if metadata else {}
            combined_meta = {
                "file_id": file_id,
                "chunk_index": i,
                "content": text,
                "has_image": bool(images and i < len(images)),
                **meta
            }

            vectors.append((
                vector_id,
                embedding.tolist(),
                combined_meta
            ))

        # Batch upsert vectors
        self.docs.upsert(vectors=vectors)

    async def hybrid_search(
        self,
        query_text: str,
        query_image: Optional[bytes] = None,
        filters: Optional[Dict] = None,
        limit: int = 5
    ) -> List[Dict]:
        """Perform hybrid vector and metadata search."""
        # Prepare input for ColQwen
        input_data = {"text": query_text}
        if query_image:
            input_data["image"] = query_image

        # Generate query embedding
        query_embedding = (await self.colqwen.get_embeddings.remote([input_data]))[0]

        # Prepare filters
        query_filters = {}
        if filters:
            query_filters.update(filters)

        # Vector search with metadata filtering
        results = self.docs.query(
            data=query_embedding.tolist(),
            limit=limit * 2,  # Get more results for reranking
            filters=query_filters,
            include_metadata=True,
            include_value=True
        )

        # Add text similarity score using full-text search
        for result in results:
            content = result['metadata']['content']
            # Calculate text similarity score (0-1)
            text_similarity = await self._calculate_text_similarity(
                content,
                query_text
            )
            # Combine vector and text similarity scores
            result['score'] = (result['distance'] + text_similarity) / 2

        # Sort by combined score and return top results
        results.sort(key=lambda x: x['score'], reverse=True)
        return results[:limit]

    async def _calculate_text_similarity(
        self,
        content: str,
        query: str
    ) -> float:
        """Calculate text similarity score using Postgres full-text search."""
        query_result = await self.supabase.rpc(
            'calculate_text_similarity',
            {
                'content': content,
                'query_text': query
            }
        ).execute()

        return query_result.data[0]['similarity']

    async def delete_by_file(self, file_id: str) -> None:
        """Delete vectors by file ID."""
        self.docs.delete(
            filters={"file_id": {"$eq": file_id}}
        )

    async def create_indexes(self) -> None:
        """Create or recreate vector indexes."""
        self.docs.create_index(
            index_type="ivfflat",
            lists=100,
            replace=True
        )
```

## RAG Implementation

### Document Processing Service

```python
from typing import Dict, List, Optional
import httpx
from unstructured.partition.auto import partition
from langchain.text_splitter import RecursiveCharacterTextSplitter

class DocumentProcessor:
    """Handles document processing and embedding generation."""

    def __init__(
        self,
        vector_store: VectorStore,
        colqwen_client: ColQwenEmbeddings,
        chunk_size: int = 1000,
        chunk_overlap: int = 200
    ):
        self.vector_store = vector_store
        self.colqwen = colqwen_client
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )

    async def process_document(
        self,
        file_id: str,
        file_path: str,
        metadata: Dict,
        extract_images: bool = True
    ) -> None:
        """Process document and generate embeddings."""
        # Extract text and images from document
        elements = partition(filename=file_path)

        # Prepare inputs for ColQwen
        texts = []
        images = []
        element_metadata = []

        for element in elements:
            if extract_images and element.type == "Image":
                # Get image bytes
                image_bytes = element.image_data
                # Get surrounding text context
                context = element.context or ""

                texts.append(context)
                images.append(image_bytes)
                element_metadata.append({
                    **metadata,
                    "element_type": "image",
                    "context": context
                })
            else:
                text = str(element)
                text_chunks = self.text_splitter.split_text(text)
                texts.extend(text_chunks)
                images.extend([None] * len(text_chunks))
                element_metadata.extend([{
                    **metadata,
                    "element_type": "text",
                    "chars": len(chunk),
                    "tokens": len(chunk.split())
                } for chunk in text_chunks])

        # Store embeddings in vector store
        await self.vector_store.store_embeddings(
            file_id=file_id,
            texts=texts,
            images=images,
            metadata=element_metadata
        )

    async def query_documents(
        self,
        query: str,
        query_image: Optional[bytes] = None,
        filters: Optional[Dict] = None,
        limit: int = 5
    ) -> List[Dict]:
        """Query documents using multimodal search."""
        return await self.vector_store.hybrid_search(
            query_text=query,
            query_image=query_image,
            filters=filters,
            limit=limit
        )
```

### SQL Functions for Text Search

```sql
-- Function to calculate text similarity score
CREATE OR REPLACE FUNCTION calculate_text_similarity(
    content TEXT,
    query_text TEXT
) RETURNS FLOAT AS $$
DECLARE
    similarity FLOAT;
BEGIN
    SELECT ts_rank_cd(
        to_tsvector('english', content),
        plainto_tsquery('english', query_text)
    ) INTO similarity;
    RETURN similarity;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Index for faster text search
CREATE INDEX IF NOT EXISTS idx_document_embeddings_content
ON document_embeddings
USING GIN (to_tsvector('english', metadata->>'content'));
```

### Usage Example (Updated)

```python
# Initialize Modal stub
stub = modal.Stub("narwhal-embeddings")
colqwen = ColQwenEmbeddings()

# Initialize services
vector_store = VectorStore(
    postgres_url="postgresql://postgres:postgres@localhost:54322/postgres",
    supabase_url="https://your-project.supabase.co",
    supabase_key="your-api-key",
    colqwen_client=colqwen
)

openai_client = AsyncOpenAI(
    api_key="your-openai-key"
)

doc_processor = DocumentProcessor(
    vector_store=vector_store,
    colqwen_client=colqwen
)

# Process a document with images
await doc_processor.process_document(
    file_id="123",
    file_path="document.pdf",
    metadata={
        "title": "Example Document",
        "author": "John Doe",
        "date": "2024-01-01"
    },
    extract_images=True
)

# Query documents with text and image
with open("query_image.jpg", "rb") as f:
    query_image = f.read()

results = await doc_processor.query_documents(
    query="What is shown in this image?",
    query_image=query_image,
    filters={
        "author": {"$eq": "John Doe"}
    },
    limit=5
)

# Use results in RAG
context = "\n\n".join([r['metadata']['content'] for r in results])
response = await openai_client.chat.completions.create(
    model="gpt-4-turbo-preview",
    messages=[
        {"role": "system", "content": "Answer based on the provided context."},
        {"role": "user", "content": f"Context:\n{context}\n\nQuestion: What is shown in this image?"}
    ]
)
```

## Security Considerations

1. **Authentication**

   - JWT tokens with 15-minute expiry
   - Secure HttpOnly cookies
   - Refresh token rotation every 24 hours
   - CORS with specific origins
   - Rate limiting by IP and user
   - Brute force protection
   - Session invalidation on password change

2. **File Storage**

   - Signed URLs with 1-hour expiry
   - File type validation against whitelist
   - Size limits (configurable per plan)
   - ClamAV virus scanning
   - Encryption at rest
   - Versioning for recovery
   - Access logging

3. **API Security**
   - Input validation with Pydantic
   - Request sanitization
   - Detailed error logging
   - Audit trail of all operations
   - SQL injection prevention
   - XSS protection
   - CSRF tokens

## Implementation Phases

1. **Phase 1: Core Infrastructure** (2-3 weeks)

   - Basic FastAPI setup with dependency injection
   - Google Auth integration with JWT
   - Supabase project setup
   - Storage bucket configuration
   - Fly.io deployment configuration
   - CI/CD pipeline setup
   - Basic testing framework

2. **Phase 2: File Operations** (3-4 weeks)

   - Upload/Download with chunking
   - File management operations
   - Sharing system with permissions
   - Directory structure with paths
   - Search functionality
   - Thumbnail generation
   - Version control

3. **Phase 3: AI Integration** (4-5 weeks)

   - OpenAI integration
   - Basic chat functionality
   - Agent framework setup
   - File analysis pipeline
   - Content extraction
   - Smart categorization
   - Search enhancement

4. **Phase 4: Advanced Features** (3-4 weeks)
   - Complex workflows
   - Batch operations
   - Advanced search with filters
   - Analytics dashboard
   - Admin panel
   - API documentation
   - Performance optimization

## Deployment Architecture

### Fly.io Configuration

1. **Application Structure**

   ```.
   /
   ├── frontend/               # Next.js 14 app
   │   ├── Dockerfile         # Frontend container
   │   ├── fly.toml           # Frontend deployment config
   │   └── package.json
   ├── backend/               # FastAPI app
   │   ├── Dockerfile         # Backend container
   │   ├── fly.toml           # Backend deployment config
   │   └── pyproject.toml
   └── fly.toml               # Root deployment config
   ```

2. **Backend Dockerfile**

   ```dockerfile
   FROM python:3.11-slim as python-base

   # Python configuration
   ENV PYTHONUNBUFFERED=1 \
       PYTHONDONTWRITEBYTECODE=1 \
       PYTHONPATH="/app" \
       PIP_NO_CACHE_DIR=off \
       PIP_DISABLE_PIP_VERSION_CHECK=on \
       PIP_DEFAULT_TIMEOUT=100

   # Install uv for faster dependency installation
   RUN pip install uv

   # System dependencies
   RUN apt-get update && apt-get install -y \
       build-essential \
       curl \
       libpq-dev \  # For psycopg
       && rm -rf /var/lib/apt/lists/*

   # Create app directory
   WORKDIR /app

   # Install dependencies with uv
   COPY requirements.txt .
   RUN uv pip install -r requirements.txt

   # Copy application
   COPY . .

   # Run with uvicorn
   CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
   ```

3. **Frontend Dockerfile**

   ```dockerfile
   FROM node:20-slim AS base
   ENV PNPM_HOME="/pnpm"
   ENV PATH="$PNPM_HOME:$PATH"
   RUN corepack enable

   FROM base AS deps
   WORKDIR /app
   COPY package.json pnpm-lock.yaml ./
   RUN pnpm install --frozen-lockfile

   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN pnpm build

   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV=production

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static

   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

4. **Backend fly.toml**

   ```toml
   app = "narwhal-api"
   primary_region = "dfw"

   [build]
   dockerfile = "Dockerfile"

   [env]
   PORT = "8080"
   SUPABASE_URL = "https://your-project.supabase.co"
   SUPABASE_SERVICE_KEY = "your-service-key"
   POSTGRES_URL = "postgres://postgres:password@narwhal-db.internal:5432"

   [http_service]
   internal_port = 8080
   force_https = true
   auto_stop_machines = true
   auto_start_machines = true
   min_machines_running = 1
   processes = ["app"]

   [[vm]]
   cpu_kind = "shared"
   cpus = 1
   memory_mb = 1024

   [metrics]
   port = 9091
   path = "/metrics"
   ```

5. **Frontend fly.toml**

   ```toml
   app = "narwhal-web"
   primary_region = "dfw"

   [build]
   dockerfile = "Dockerfile"

   [env]
   PORT = "3000"
   NEXT_PUBLIC_API_URL = "https://api.narwhal.fly.dev"

   [http_service]
   internal_port = 3000
   force_https = true
   auto_stop_machines = true
   auto_start_machines = true
   min_machines_running = 1
   processes = ["app"]

   [[vm]]
   cpu_kind = "shared"
   cpus = 1
   memory_mb = 1024

   [metrics]
   port = 9091
   path = "/metrics"
   ```

6. **Deployment Workflow**

   ```yaml
   name: Deploy
   on: [push]

   jobs:
     deploy:
       name: Deploy app
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: superfly/flyctl-actions/setup-flyctl@master
         - run: flyctl deploy --remote-only
         env:
           FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
   ```

7. **Scaling Configuration**

   ```toml
   # Scale up configuration in fly.toml
   [[services.concurrency]]
   type = "connections"
   hard_limit = 25
   soft_limit = 20

   [[services.tcp_checks]]
   interval = "15s"
   timeout = "2s"
   grace_period = "1s"
   restart_limit = 0
   ```

8. **Environment Management**

   ```bash
   # Setting secrets
   fly secrets set SUPABASE_URL="https://your-project.supabase.co"
   fly secrets set SUPABASE_SERVICE_KEY="your-service-key"
   fly secrets set OPENAI_API_KEY="..."

   # Per-environment configs
   fly config env -a narwhal-api-staging
   fly config env -a narwhal-api-prod
   ```

## Development Guidelines

1. **Code Organization**

   ```.
   backend/
   ├── app/
   │   ├── api/              # API routes
   │   ├── core/             # Core functionality
   │   │   ├── config/
   │   │   ├── security/
   │   │   └── events/
   │   ├── models/           # Data models
   │   │   ├── domain/       # Domain models
   │   │   ├── postgres/     # Supabase models
   │   │   └── vectors/      # Vector store models
   │   ├── services/         # Business logic
   │   │   ├── storage/      # Supabase storage
   │   │   ├── ai/          # AI/ML services
   │   │   └── auth/        # Auth services
   │   └── utils/           # Utilities
   ├── tests/                # Test suites
   │   ├── unit/
   │   ├── integration/
   │   └── e2e/
   ├── alembic/              # DB migrations
   └── docker/               # Docker configs
   ```

2. **Best Practices**

   - Type hints for all functions
   - Async operations where beneficial
   - Dependency injection pattern
   - Comprehensive testing (80%+ coverage)
   - Detailed documentation
   - Error handling with custom exceptions
   - Logging at appropriate levels
   - Code formatting with black
   - Linting with ruff
   - Type checking with mypy

3. **Observability**
   - Fly.io metrics dashboard
   - Application-level logging
   - Error tracking with Fly.io
   - Custom health checks
   - Performance monitoring

## Required Placeholders/Decisions

1. **Infrastructure**

   - ✓ Hosting: Fly.io
   - Domain name
   - ✓ Storage: Supabase
   - ✓ Primary DB: Supabase Postgres
   - ✓ Vector DB: Supabase vecs
   - ✓ SSL: Automatic with Fly.io
   - ✓ CDN: Supabase Storage CDN

2. **Security**

   - Backup strategy
   - Disaster recovery plan
   - Compliance requirements (GDPR, CCPA, etc.)
   - Security audit schedule

3. **Integration**

   - Email service provider
   - Push notification service
   - Analytics platform
   - Error tracking service
   - Payment processor

4. **Business**
   - Pricing tiers
   - Storage limits
   - Feature matrix
   - SLA definitions
   - Support workflow
