# SQLify

A lightweight web application that transforms CSV and Excel files into SQL code automatically. Upload your data files and generate ready-to-use CREATE TABLE and INSERT INTO statements.

## Features

- **Multi-format Support**: Upload CSV and Excel  files
- **Table Customization**: Rename your database table before generating SQL
- **Column Selection**: Choose which columns to include or exclude from the output
- **Complete SQL Generation**: 
  - CREATE TABLE statements with proper column definitions
  - INSERT INTO statements for all data rows
- **Modern Interface**: Clean, centered, and responsive design
- **Copy & Download**: Easy copy-to-clipboard or download SQL files
- **Data Validation**: Handles empty cells, trims whitespace, and removes empty rows
- **Real-time Preview**: See your SQL output update as you make changes


## Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/vincenzo113/sqlify.git
   cd sqlify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Dependencies

The project uses the following main libraries:
- **React**: Frontend framework
- **Papa Parse**: CSV parsing and processing
- **SheetJS**: Excel file reading and parsing

## Usage Guide

### Step 1: Upload Your File
1. Click on "Choose File" or drag and drop your CSV/Excel file
2. Supported formats: `.csv`, `.xlsx`

### Step 2: Review Generated SQL
- The app automatically generates SQL code in the text area
- CREATE TABLE statement 
- INSERT INTO statements for your data

### Step 3: Customize (Optional)
- **Rename Table**: Modify the table name in the generated SQL
- **Select Columns**: Use the column selector to include/exclude specific columns
- Changes update the SQL output in real-time

### Step 4: Export Your SQL
- **Copy**: Click "Copy" to copy SQL to clipboard
- **Download**: Click "Download" to save as `.sql` file

### Alternative: Paste Data
- Click "Paste" to manually input CSV or Excel data
- Useful for quick conversions without file uploads

## Example Input/Output

### Sample CSV Input
```csv
id,name,email,age,created_date
1,John Doe,john@example.com,28,2023-01-15
2,Jane Smith,jane@example.com,34,2023-01-16
3,Bob Johnson,bob@example.com,25,2023-01-17
```

### Generated SQL Output
```sql
CREATE TABLE my_table (
    id VARCHAR,
    name VARCHAR(,
    email VARCHAR,
    age VARCHAR,
    created_date VARCHAR
);

INSERT INTO my_table (id, name, email, age, created_date) VALUES
(1, 'John Doe', 'john@example.com', 28, '2023-01-15'),
(2, 'Jane Smith', 'jane@example.com', 34, '2023-01-16'),
(3, 'Bob Johnson', 'bob@example.com', 25, '2023-01-17');
```



## Roadmap

### Planned Features
- [ ] **Database-specific SQL dialects** (MySQL, PostgreSQL, SQLite, SQL Server)
- [ ] **Advanced type inference** with custom type mapping
- [ ] **Batch file processing** for multiple files
- [ ] **SQL query builder** for SELECT statements
- [ ] **Data preview table** before SQL generation
- [ ] **Import from other different formats** (JSON, XML)
- [ ] **Schema validation** and constraint generation
- [ ] **Dark mode** theme support

### Known Issues
- Large files (>50MB) may cause performance issues
- Date format detection limited to common formats
- No support for nested JSON structures in CSV

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- CSV parsing powered by [Papa Parse](https://www.papaparse.com/)
- Excel support via [SheetJS](https://sheetjs.com/)

---

**Made with ❤️**
