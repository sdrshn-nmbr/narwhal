from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.api.router import api_router
from app.services.storage import StorageService
import os

if os.environ.get("APP_ENV") == "dev":
    os.environ["PYTHONDONTWRITEBYTECODE"] = "1"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize storage on startup
    storage = StorageService()
    await storage.initialize_bucket()
    yield

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="Narwhal Cloud Storage API",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(api_router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 