# Otaku Data Engine 🎌

An end-to-end Data Engineering pipeline designed to extract, transform, and load (ETL) anime data from the Jikan API (MyAnimeList) into a local data warehouse.

## 🚀 Project Overview
This project serves as a portfolio piece demonstrating modern data engineering practices, including containerization, automated extraction, and relational database modeling.

## 🛠️ Tech Stack
* **Orchestration & Infrastructure:** Docker, Docker Compose
* **Data Extraction:** Python (Requests, Pandas)
* **Storage:** PostgreSQL 15
* **Transformation & Modeling:** dbt Core (Star Schema, Bridge Tables)
* **Data Quality:** dbt-tests (Referential Integrity)

## 📂 Project Structure
* `data-pipeline/`: Python scripts for API extraction and raw loading.
* `transform/`: dbt models converting raw data into a validated Star Schema.
* `docker/`: Infrastructure configuration (Postgres, pgAdmin, dbt-container).
* `backend/`: Node.js API (In development).
* `frontend/`: React Dashboard (In development).
