import Layout from "@components/common/Layout";
import { render } from "@utils/test-utils";

test("renders layout with no header and footer", () => {
  const { queryByTestId } = render(<Layout />);

  const layout = queryByTestId("layout");
  const header = queryByTestId("layout-header");
  const footer = queryByTestId("layout-footer");

  expect(layout).toBeInTheDocument();
  expect(header).not.toBeInTheDocument();
  expect(footer).not.toBeInTheDocument();
});

test("renders layout with header", async () => {
  const headerprops = {};
  const { queryByTestId } = render(<Layout header={headerprops} />);

  const layout = queryByTestId("layout");
  const header = queryByTestId("layout-header");

  expect(layout).toBeInTheDocument();
  expect(header).toBeInTheDocument();
});

test("renders layout with footer", async () => {
  const footerprops = {};
  const { queryByTestId } = render(<Layout footer={footerprops} />);

  const layout = queryByTestId("layout");
  const footer = queryByTestId("layout-footer");

  expect(layout).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});
