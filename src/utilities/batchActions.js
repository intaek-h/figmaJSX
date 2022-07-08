import { groupByActionTypes } from "redux-undo";

export const batchGroupBy = {
  _group: null,
  start(group) {
    this._group = group;
  },
  end() {
    this._group = null;
  },
  init(rawActions) {
    const defaultGroupBy = groupByActionTypes(rawActions);

    return (action) => this._group || defaultGroupBy(action);
  },
};
