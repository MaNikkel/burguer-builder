import axtios from "axios";

const orderInstance = axtios.create({
  baseURL: "https://react-my-burger-4094a.firebaseio.com/"
});

export default orderInstance;
