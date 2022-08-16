import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../components/auth/Login"
import '@testing-library/jest-dom'
import store from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


test("rendering placeholder input email", () => {
    render(<Provider store={store}><BrowserRouter >
      <Login /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/johndoe@gmail.com/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("rendering placeholder input password", () => {
    render(<Provider store={store}><BrowserRouter >
      <Login /></BrowserRouter></Provider>);
    const passwordInput = screen.getByPlaceholderText(/masukkan password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("username input should be empty", () => {
    render(<Provider store={store}><BrowserRouter >
      <Login /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/johndoe@gmail.com/i);
    expect(emailInput.value).toBe("");
  });
  
  test("password input should be empty", () => {
    render(<Provider store={store}><BrowserRouter >
      <Login /></BrowserRouter></Provider>);
    const passwordInput = screen.getByPlaceholderText(/masukkan password/i);
    expect(passwordInput.value).toBe("");
  });
  
  test("username input should change", () => {
    render(<Provider store={store}><BrowserRouter >
      <Login /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/johndoe@gmail.com/i);
    const testValue = "test";
  
    fireEvent.change(emailInput, { target: { value: testValue } });
    expect(emailInput.value).toBe(testValue);
  });
  
  test("password input should change", () => {
    render(<Provider store={store}><BrowserRouter >
      <Login /></BrowserRouter></Provider>);
    const passwordInput = screen.getByPlaceholderText(/masukkan password/i);
    const testValue = "test";
  
    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput.value).toBe(testValue);
  });
  
  