```
npm init -y
```

```
npm i express mysql nodemon
```

#### Creating users table

```sql
CREATE TABLE `blog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
```

#### Creating posts table

```sql
CREATE TABLE `blog`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `desc` VARCHAR(1000) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `uid_idx` (`uid` ASC) VISIBLE,
  CONSTRAINT `uid`
    FOREIGN KEY (`uid`)
    REFERENCES `blog`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
```

#### Create new post

```sql
INSERT INTO `blog`.`posts` (`id`, `title`, `desc`, `img`, `date`, `uid`) VALUES ('3', 'third post', 'Just checking', 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2024-02-26', '1');
```

#### using mysql2

```js
import { createPool } from "mysql2/promise";

const pool = await createPool({
    host: "YOUR_MYSQL_HOST", // Replace with your actual host
    user: "YOUR_MYSQL_USER", // Replace with your actual user
    password: "YOUR_MYSQL_PASSWORD", // Replace with your actual password, but NEVER store it in plain text!
    database: "YOUR_MYSQL_DATABASE", // Replace with your actual database
    // Additional pool configuration options: https://www.npmjs.com/package/mysql2
});

// Example usage:
try {
    const [data] = await pool.query("YOUR_SQL_QUERY", [
        /* parameter values */
    ]);
    // Process the results as needed
} catch (err) {
    console.error("Error executing query:", err.stack);
    // Handle the error appropriately, e.g., return a proper error response
}

// Close the connection pool when done
await pool.end();
```

#### my sql default date format

```
YYYY-MM-DD
'1000-01-01' to '9999-12-31'
```
