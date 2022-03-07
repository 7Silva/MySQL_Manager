<h1>Mysql Manager</h1>
<div>
    <a href=''><img src='https://img.shields.io/hexpm/l/plug' /></a>
    <a href=''><img src='https://img.shields.io/github/last-commit/7Silva/MySQL_Manager' /></a>
    <a href=''><img src='https://img.shields.io/github/repo-size/7Silva/MySQL_Manager' /></a>
</div>

<!-- Functions Div -->
<div>
    <h2>Functions</h2>
    <p><strong>MySQL Manager</strong> was created in order to help micro companies or users who need an API to use their Database, either in Web Applications or Desktop Applications.</p>
</div>

- <strong>Security</strong>:
  - [x] Block User-Agent
  - [x] Block Country
  - [x] Rate Limit
  - [x] Headers Authorization 
  - [ ] Block Ip Address <strong>(Coming soon)</strong>

- <strong>Database Query</strong>:
  - [x] Fetch All <strong>(Select all)</strong>
  - [x] Fetch One <strong>(Select Where)</strong>
  - [x] Insert Values
  - [x] Delete Values

- <strong>Errors</strong>:
  - Some errors are already configured by default, but can be edited in:

<div>

    /📁 MySQL Manager
     └📂 src
      └📂 structures
       └⚙️ errorsClient.json
        
</div>
<!-- Final Functions Div -->

<!-- Dependencies / Facilities -->
<div>
    <h2>Dependencies / Facilities</h2>
</div>

- <strong>Web Application</strong>:
  - <em><a href='https://www.npmjs.com/package/express-rate-limit'>Express-rate-limit</a></em>
  - <em><a href='https://www.npmjs.com/package/morgan'>Morgan</a></em>
  - <em><a href='https://expressjs.com'>Express</a></em>
  - <em><a href='https://www.npmjs.com/package/cors'>Cors</a></em>
- <strong>Security</strong>:
  - <em><a href='https://www.npmjs.com/package/geoip-lite'>Geoip-lite</a></em>
  - <em><a href='https://www.npmjs.com/package/bcryptjs'>Bcryptjs</a></em>
  - <em><a href='https://www.npmjs.com/package/dotenv'>Dotenv</a></em>
- <strong>Database</strong>:
  - <em><a href='https://sequelize.org/'>Sequelize</a></em>
  - <em><a href='https://www.npmjs.com/package/mysql2'>Mysql2</a></em>

<p>You can install all libraries at once using the command <strong><code>npm install</code></strong> or <strong><code>yarn</code></strong>.</p>
<!-- Final Dependencies / Facilities -->

<!-- How to Use -->
<div>
    <h2>How to Use</h2>
</div>

<h3>Configuration:</h3>

- <strong>Security</strong>:
  - Create .env file or rename <strong><code>.env-example</code></strong> file to <strong><code>.env</code></strong>
    - Configure the way you want or copy and paste our recommended settings into: 
      - ```    
        /📁 MySQL Manager
         └📂 assets
          └📂 config
           └⚙️ configuration-env
        ```
- <strong>Server</strong>:
  - In the <strong><code>.env</code></strong> file, configure the port you want to create your server and what is the request limit.

<h3>Starting the server:</h3>

- <strong>Development or testing</strong>
  - <strong><code>node .</code></strong> or <strong><code>node server.mjs</code></strong>

- <strong>To use</strong>
  - To use it, we recommend using <strong>Pm2</strong> to keep your server online 24/7, for more information visit <a href='https://pm2.keymetrics.io/docs/usage/quick-start/'>Pm2 Docs</a>

<h3>Run queries:</h3>

- <strong>Select Values</strong>
  - Fetch All:
    - ```js
        axios.get('http://localhost:3000/api/YouDatabase/select/Table', {
            headers: { authorization: 'Secret Key' }
        })
        .then(console.log)
        .catch(console.log)
      ```
  - Fetch One:
    - ```js
        axios.get('http://localhost:3000/api/YourDatabase/select/Table?id=1', {
            headers: { authorization: 'Secret Key' }
        })
        .then(console.log)
        .catch(console.log)
      ```

- <strong>Insert Values:</strong>
  - ```js
        axios.post('http://localhost:3001/api/YourDatabase/insert', {
            table: "table",
            columns: ['project', 'contributors'],
            values: ['MySQL Manager', 'Daniel T. Silva, Bucky, Johnsz']
        }, { headers: { authorization: 'Secret Key' } })
        .then(console.log)
        .catch(console.log)
      ```

- <strong>Delete Values:</strong>
  - ```js
        axios.post('http://localhost:3001/api/YourDatabase/delete', {
            table: "table",
            value: {
                project: 'MySQL Manager'
            }
        }, {  headers: { authorization: 'Secret Key' } })
        .then(console.log)
        .catch(console.log)
      ```

<p>We use <a href='https://axios-http.com/'>axios</a> (a Nodejs request library), but you can use any other library to make requests.</p>
<!-- Final How to Use -->

<!-- Contributors -->
<h2>Contributors</h2>

| [<img src="https://github.com/7Johnsz.png?size=115" width=115><br><sub>@Johnsz</sub>](https://github.com/7Johnsz) |
| :---: | 

<h2>Authors</h2>

| [<img src="https://github.com/7Silva.png?size=115" width=115><br><sub>@Daniel T. Silva</sub>](https://github.com/7Silva) | [<img src="https://github.com/isBucky.png?size=115" width=115><br><sub>@Bucky</sub>](https://github.com/isBucky) |
| :---: | :---: |