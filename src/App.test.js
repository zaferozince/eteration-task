import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

test('should list max 12 products', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => {
    const products = screen.getAllByTestId('product-item');
    expect(products.length).toBeLessThanOrEqual(12);
  });
});
test('should check if "Add to Cart" button data-product-name exists in any cart item data-product-name', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const addToCartButtons = screen.getAllByText('Add to Cart');
  const randomIndex = Math.floor(Math.random() * addToCartButtons.length);
  const randomAddToCartButton = addToCartButtons[randomIndex];
  fireEvent.click(randomAddToCartButton);
  const cartItems = screen.getAllByTestId('cart-item');
  const productNameFromButton = randomAddToCartButton.getAttribute('data-product-name');
  const isProductInCart = cartItems.some((cartItem) => cartItem.getAttribute('data-product-name') === productNameFromButton);
  expect(isProductInCart).toBe(true);
});
test('should navigate to product details and display product description when a product with data-set-id="product" is randomly clicked', () => {
  render(
    <Provider store={store}>
    <App />
  </Provider>
  );
  const productsWithDataSetId = screen.getAllByTestId('product')
  const randomIndex = Math.floor(Math.random() * productsWithDataSetId.length);
  const randomProduct = productsWithDataSetId[randomIndex];
  fireEvent.click(randomProduct); 
  expect(window.location.pathname).toBe(`/details`);
  expect(document.body.innerHTML).toContain(randomProduct.getAttribute('data-description'));
});
test('should filter products based on random labels clicked', () => {
  render(
    <Provider store={store}>
    <App />
  </Provider>
  );
  waitFor(() => {
    const modelLabels = screen.getAllByTestId('model-label');
    const randomModelLabels = getRandomElements(modelLabels, 3); 
    const brandLabels = screen.getAllByTestId('brand-label');
    const randomBrandLabels = getRandomElements(brandLabels, 3); 

    randomModelLabels.forEach((label) => {
      fireEvent.click(label);
    });

    randomBrandLabels.forEach((label) => {
      fireEvent.click(label);
    });

    const filteredProducts = screen.getAllByTestId('product').filter((product) => {
      const brand = product.getAttribute('data-brand');
      const model = product.getAttribute('data-model');
      return (
        randomBrandLabels.some((label) => label.textContent === brand) ||
        randomModelLabels.some((label) => label.textContent === model)
      );
    });

    expect(filteredProducts.length).toBeGreaterThan(0); 
    });
});

