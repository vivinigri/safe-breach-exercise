import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import App from "./App"
import { Provider as StoreProvider } from "react-redux"
import store from "./store"

const AppWithStore = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
)

test("renders submit button", () => {
  render(<AppWithStore />)
  const submitBtn = screen.getByText(/search/i)
  expect(submitBtn).toBeInTheDocument()
})

test("edit contact", async () => {
  render(<AppWithStore />)
  fireEvent.change(screen.getByTestId("query"), {
    target: { value: "berg" },
  })
  const submitBtn = screen.getByText(/search/i)
  fireEvent.click(submitBtn)
  await waitFor(() => {
    expect(screen.getByText(/Phone/i)).toBeInTheDocument()
  })
  const edit = await screen.findByTestId("edit")
  fireEvent.click(edit)
  fireEvent.change(screen.getByTestId("bday"), {
    target: { value: "2010-03-03" },
  })
  const saveBtn = await screen.findByTestId("save")
  fireEvent.click(saveBtn)
  await waitFor(() => {
    expect(screen.getByText(/11/i)).toBeInTheDocument()
  })
})

test("query Berg", async () => {
  render(<AppWithStore />)
  fireEvent.change(screen.getByTestId("query"), {
    target: { value: "berg" },
  })
  const submitBtn = screen.getByText(/search/i)
  fireEvent.click(submitBtn)
  await waitFor(() => {
    expect(screen.getByText(/Phone/i)).toBeInTheDocument()
  })
})

test("wrong query", async () => {
  render(<AppWithStore />)
  fireEvent.change(screen.getByTestId("query"), {
    target: { value: "bergman 4444" },
  })
  const submitBtn = screen.getByText(/search/i)
  fireEvent.click(submitBtn)
  await waitFor(() => {
    expect(screen.getByTestId("feedback")).toHaveTextContent("No results")
  })
})

test("delete contact", async () => {
  render(<AppWithStore />)
  fireEvent.change(screen.getByTestId("query"), {
    target: { value: "berg" },
  })
  const submitBtn = screen.getByText(/search/i)
  fireEvent.click(submitBtn)
  await waitFor(() => {
    expect(screen.getByText(/Phone/i)).toBeInTheDocument()
  })
  const deleteBtn = await screen.findByTestId("delete")
  fireEvent.click(deleteBtn)
  await waitFor(() => {
    expect(screen.getByTestId("feedback")).toHaveTextContent("No results")
  })
})
