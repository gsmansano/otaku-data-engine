# Otaku Data Engine 🎌

An end-to-end Data Engineering and Analytics platform designed to extract, transform, and analyze anime industry trends using data from the Jikan API (MyAnimeList).

## 🚀 Project Overview
This project demonstrates a full-cycle data journey: from raw API ingestion to a refined Star Schema, and finally serving high-level market insights through a Node.js REST API. It is built with a focus on **Market Analysis**, answering questions about industry growth, quality trends, and studio performance.

## 🛠️ Tech Stack
* **Infrastructure:** Docker, Docker Compose
* **Data Extraction:** Python (Requests, Pandas)
* **Storage:** PostgreSQL 15
* **Transformation:** dbt Core (Star Schema, Bridge Tables)
* **Backend:** Node.js (Express), ES Modules
* **Environment:** Dotenv, PG-Pool

## 📈 Analytical Capabilities
Unlike a standard anime list, this engine is built for **Landscape Analysis**:
* **Market Summary:** Aggregated industry reach and quality benchmarks.
* **Yearly Trends:** Time-series analysis of release volume vs. average scores.
* **Performance Metrics:** Using dbt "Marts" to serve denormalized, high-performance data.

## 📂 Project Structure
* `data-pipeline/`: Python scripts for API extraction and raw loading.
* `transform/`: dbt models converting raw data into a validated Star Schema and Gold Layer Marts.
* `backend/`: Node.js Express API serving market insights and individual anime data.
* `docker/`: Infrastructure configuration (Postgres, pgAdmin).
* `frontend/`: React Dashboard (Planned).w