/**
 * @jest-environment jsdom
 */

import render, { screen } from "../../../test-utils/wrappedRender";
import userEvent from "@testing-library/user-event";
import ProjectTitleInput from ".";
import { INITIAL_STATE } from "../../../test-utils/mockStates";
import { setProjectTitle } from "../../../features/utility/utilitySlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const setup = {
  render: () => {
    render(<ProjectTitleInput />);
  },
};

describe("ProjectTitleInput", () => {
  test("프로젝트의 이름을 보여줍니다.", () => {
    setup.render();

    screen.getByText(INITIAL_STATE.utility.projectTitle);
  });

  test("텍스트를 더블 클릭하면 프로젝트 이름을 수정할 수 있는 입력창이 나옵니다.", async () => {
    setup.render();

    const user = userEvent.setup();
    const title = screen.getByText(INITIAL_STATE.utility.projectTitle);

    await user.dblClick(title);

    const input = screen.getByRole("textbox");

    await user.clear(input);
    await user.type(input, "new title");
    await user.click(input.parentElement);

    expect(mockDispatch).toBeCalledWith(setProjectTitle("new title"));
  });
});
