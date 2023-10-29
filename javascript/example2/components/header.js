export const getHeaderElement = (...menuItems) => {
  return DOM.element({
    tag: "header",
    style: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: "1em",
    },
    H1: "Deck of Cards",
    p: "Click the cards to flip them.",
    menu: {
      marginTop: "1em",
      button: menuItems,
    }
  });
};

export default getHeaderElement;