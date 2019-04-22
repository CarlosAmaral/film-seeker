import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

import Search from "./Search";

describe("Search Component", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(
      <Provider store={store}>
        <Search debug />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("should render correctly without props", () => {
    const component = mount(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("should find an input field add a value successfully", () => {
    const component = mount(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const filmName = component.find("input");
    filmName.value = "casablanca";
    expect(filmName.value).toBe("casablanca");
    expect(component).toMatchSnapshot();
    
    component.unmount();
  });
});
