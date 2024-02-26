// netlify/functions/my_func.js

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from my_func!" }),
  };
};
