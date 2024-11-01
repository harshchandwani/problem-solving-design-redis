#Problem Solving Application: Design

- Tech
  - Redis
  - Express
  - Vite
  - Nodejs
 
Steps

- User writes a solution and submit
- Goes to the Main Server
- Server adds the solution to the queue
- From the queue, that solution is picked up by the worker
- Testing out and generating report work will be of this worker
- After the worker reaches  a solution
- That is pushed to the publisher (we used Redis for this)
- Then the WebSocket which is a subscriber to the same channel will get the information of the solution from the worker
- Now frontend is connected to the WebSocket, once the solution is, it goes to the frontend

  
More Detailed Design below



![Screenshot 2024-10-23 060956](https://github.com/user-attachments/assets/b1c9582a-504c-448e-953c-ce6300c94f36)
