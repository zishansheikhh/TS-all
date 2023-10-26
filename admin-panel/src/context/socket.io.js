import io from "socket.io-client";

export const adminSocket = io("https://api.leveranceoxygen.com", {
  withCredentials: true,

    transportOptions: {
        polling: {
          extraHeaders: {
            "my-custom-header": "abcd"
          }
        }
    }
});

// export const sellerSocket = io("https://api.leveranceoxygen.com", {
//   withCredentials: true,

//     transportOptions: {
//         polling: {
//           extraHeaders: {
//             "my-custom-header": "abcd"
//           }
//         }
//     }
// });

// export const adminSocket = io("http://localhost:8000");
// export const sellerSocket = io("http://localhost:8000");

export function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }