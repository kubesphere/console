/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { configure } from 'enzyme';
import React16Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

configure({ adapter: new React16Adapter() });

global.t = key => key;
global.t.html = key => key;

global.request = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

const doc = new JSDOM('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
global.document.body.createTextRange = function () {
  return {
    setEnd() {},
    setStart() {},
    getBoundingClientRect() {
      return { right: 0 };
    },
    getClientRects() {
      return {
        length: 0,
        left: 0,
        right: 0,
      };
    },
  };
};

global.window.console = {
  warn: () => {},
  log: () => {},
  info: () => {},
  error: () => {},
};

jest.mock('@pitrix/lego-locale', () => ({
  get: key => key,
  getHTML: key => key,
}));
