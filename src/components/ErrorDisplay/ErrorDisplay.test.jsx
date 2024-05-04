import { render, screen } from "@testing-library/react";
import ErrorDisplay from ".";
import userEvent from "@testing-library/user-event";

describe("error display bileşeni", () => {
  beforeEach(() => {
    console.log("TESTİN ÇALIŞMASINDAN HEMEN ÖNCE");
  });

  beforeAll(() => {
    console.log("TESTİN ÇALIŞMASINDAN HEMEN SONRA");
  });

  test("doğru mesajı gösterir", () => {
    const errorMessage = "404 content was not found";
    render(<ErrorDisplay message={errorMessage} retry={() => {}} />);

    screen.getByText(errorMessage);
  });

  test("tekrar dene butonuna tıklnınca fonksiyon çalışır", async () => {
    const user = userEvent.setup();

    const retryMock = jest.fn();

    render(<ErrorDisplay message={"xx"} retry={retryMock} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(retryMock).toHaveBeenCalled();
  });
});
