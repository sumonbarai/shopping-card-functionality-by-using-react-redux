import {
  ADDTOCARD,
  PRODUCTFAILED,
  PRODUCTREQUEST,
  PRODUCTSUCCESS,
  REMOVETOCARD,
} from "./actionType";
// initialState define
const initalState = {
  product: [],
  isLoading: false,
  error: "",
  card: [],
};
// reducer for product
const reducer = (state = initalState, action) => {
  switch (action.type) {
    case PRODUCTREQUEST:
      return {
        ...state,
        product: [],
        isLoading: true,
        error: "",
        card: [],
      };
    case PRODUCTSUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        error: "",
        card: [],
      };
    case PRODUCTFAILED:
      return {
        ...state,
        product: [],
        isLoading: false,
        error: action.payload,
        card: [],
      };
    case ADDTOCARD:
      const upcomingProductId = action.payload._id;
      const isExist = state.card.find((pro) => pro._id === upcomingProductId);

      if (isExist) {
        const remainingProduct = state.product.filter(
          (pro) => pro._id !== upcomingProductId
        );
        const modifyProduct = state.product.find(
          (pro) => pro._id === upcomingProductId
        );
        modifyProduct.quantity = modifyProduct.quantity - 1;

        const remainProduct = state.card.filter(
          (p) => p._id !== upcomingProductId
        );
        const updateProduct = { ...isExist };
        updateProduct.quantity = updateProduct.quantity + 1;

        return {
          ...state,
          product: [...remainingProduct, modifyProduct],
          card: [...remainProduct, updateProduct],
        };
      } else {
        const remainingProduct = state.product.filter(
          (pro) => pro._id !== upcomingProductId
        );
        const modifyProduct = state.product.find(
          (pro) => pro._id === upcomingProductId
        );
        modifyProduct.quantity = modifyProduct.quantity - 1;
        const newCard = { ...action.payload };
        newCard.quantity = 1;

        return {
          ...state,
          product: [...remainingProduct, modifyProduct],
          card: [...state.card, newCard],
        };
      }
    case REMOVETOCARD:
      const upcomingRemoveId = action.payload._id;
      const isRemoveExist = state.card.find(
        (pro) => pro._id === upcomingRemoveId
      );
      // checking item is exist or not
      if (isRemoveExist) {
        const numberOfItem = isRemoveExist.quantity;
        // checking item is number of item in card
        if (numberOfItem > 1) {
          const remainCard = state.card.filter(
            (c) => c._id !== upcomingRemoveId
          );
          // update product array
          const remainingProduct = state.product.map((pro) => {
            if (pro._id === upcomingRemoveId) {
              return {
                ...pro,
                quantity: pro.quantity + 1,
              };
            } else {
              return {
                ...pro,
              };
            }
          });
          return {
            ...state,
            product: remainingProduct,
            card: [
              ...remainCard,
              { ...isRemoveExist, quantity: isRemoveExist.quantity - 1 },
            ],
          };
        } else {
          const remainCard = state.card.filter(
            (c) => c._id !== upcomingRemoveId
          );
          // update product array
          const remainingProduct = state.product.map((pro) => {
            if (pro._id === upcomingRemoveId) {
              return {
                ...pro,
                quantity: pro.quantity + 1,
              };
            } else {
              return {
                ...pro,
              };
            }
          });
          return {
            ...state,
            product: remainingProduct,
            card: [...remainCard],
          };
        }
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
};

export default reducer;
