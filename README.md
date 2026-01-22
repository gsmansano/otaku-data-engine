# Otaku Data Engine 🎌

An end-to-end Data Engineering pipeline designed to extract, transform, and load (ETL) anime data from the Jikan API (MyAnimeList) into a local data warehouse.

## 🚀 Project Overview
This project serves as a portfolio piece demonstrating modern data engineering practices, including containerization, automated extraction, and relational database modeling.

## 🛠️ Tech Stack
* **Language:** Python 3
* **Infrastructure:** Docker, Docker Compose
* **Database:** PostgreSQL 15
* **Database Management:** pgAdmin 4
* **Libraries:** Pandas, SQLAlchemy, Requests, Python-Dotenv

## 📂 Project Structure
* `docker/`: Contains the configuration for the PostgreSQL and pgAdmin containers.
* `data-pipeline/`: Contains the Python source code for the ETL processes.
    * `src/`: Main scripts (Extraction, Loading).
    * `test/`: Connection and unit tests.
