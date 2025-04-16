import http from 'http';
import url from 'url';

const students = [
  { id: 1, name: 'Nguyễn Văn A', class: 'Fullstack Web' },
  { id: 2, name: 'Nguyễn Văn B', class: 'Mobile' },
  { id: 1, name: 'Lê Văn C', class: 'Blockchain' },
];

const requestHandler = (request, response) => {
  const method = request.method; // Phương thức
  const parseUrl = url.parse(request.url, true); // Phân tích URL và query string
  const path = parseUrl.pathname; // endpoints
  console.log('🚀 ~ requestHandler ~ path:', path);
  console.log('🚀 ~ requestHandler ~ method:', method);

  // Routing
  //   Handle routing for students
  if (path === '/students') {
    switch (method) {
      case 'GET': {
        // response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(JSON.stringify(students));
        break;
      }
      case 'POST': {
        //Logic add new student
        response.end('API create new student');
        break;
      }
      case 'PUT': {
        // Logic update a student
        response.end('API update new student');
        break;
      }
      case 'DELETE': {
        // Logic remove a student
        response.end('API delete new student');
        break;
      }
    }
  }

  response.end('Welcome to my server!!!');
};

const app = http.createServer(requestHandler);
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

// API: Application Programming Interface
//URL: http://localhost:8080/students
//URL: http://localhost:8080/classes
//URL: http://localhost:8080/users

// Method: Get, Post, Put, Delete
// Endpoint: students => routing

// Trả về tất cả các học sinh ở trong lớp
// http://localhost:8080/students
// Method GET
