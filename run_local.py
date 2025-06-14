#!/usr/bin/env python3
"""
Local development server script for Mobile Pet Grooming Website
Run this file to start the development server with auto-reload
"""

import os
import sys
from app import app

if __name__ == '__main__':
    # Set default environment variables for local development
    if not os.environ.get('SESSION_SECRET'):
        os.environ['SESSION_SECRET'] = 'dev-secret-key-change-in-production'
        print("⚠️  Using default SESSION_SECRET for development")
        print("   Set SESSION_SECRET environment variable for production")
    
    # Development configuration
    app.config['DEBUG'] = True
    app.config['ENV'] = 'development'
    
    print("🐾 Mobile Pet Grooming Website")
    print("💻 Starting development server...")
    print("🌐 Visit: http://localhost:5000")
    print("⏹️  Press Ctrl+C to stop")
    print("-" * 50)
    
    try:
        # Run the development server
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=True,
            use_reloader=True
        )
    except KeyboardInterrupt:
        print("\n👋 Development server stopped")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)