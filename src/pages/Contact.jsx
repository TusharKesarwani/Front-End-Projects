// import React from 'react';

// const Contact = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col justify-center py-10 px-6">
//       <section id="contact" className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h1>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Your Name"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Your Email"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
//               Message
//             </label>
//             <textarea
//               id="message"
//               required
//               rows="4"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Your Message"
//             />
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Send Message
//             </button>
//           </div>
//         </form>

//         <div className="mt-8 text-center">
//           <h2 className="text-lg font-semibold text-gray-700">Connect with us</h2>
//           <div className="flex justify-center mt-4 space-x-6">
//             <a href="#" className="text-blue-500 hover:text-blue-700">
//               <i className="fab fa-facebook-f"></i> {/* Font Awesome icon */}
//             </a>
//             <a href="#" className="text-blue-400 hover:text-blue-600">
//               <i className="fab fa-twitter"></i> {/* Font Awesome icon */}
//             </a>
//             <a href="#" className="text-pink-500 hover:text-pink-700">
//               <i className="fab fa-instagram"></i> {/* Font Awesome icon */}
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;


import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center py-10 px-6">
      <section id="contact" className="bg-white shadow-lg rounded-lg p-8 max-w-6xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                required
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Message"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="md:w-1/2 pl-4 mt-8 md:mt-0">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            We would love to hear from you! Please fill out the form on the left or reach us through the following:
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Address:</strong> 123 Inspiring Lane, Creativity City, CA 90210
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> contact@inspiringtie.com
          </p>
          <div className="flex justify-center mt-6 space-x-6">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-facebook-f"></i> {/* Font Awesome icon */}
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-twitter"></i> {/* Font Awesome icon */}
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-700">
              <i className="fab fa-instagram"></i> {/* Font Awesome icon */}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
