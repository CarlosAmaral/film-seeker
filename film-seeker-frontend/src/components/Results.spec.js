import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

import Results from './Results';

describe('Results Component', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(
      <Provider store={store}>
        <Results debug />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("should render correctly without props", () => {
    const component = shallow(
      <Provider store={store}>
        <Results name="asdad"/>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

});