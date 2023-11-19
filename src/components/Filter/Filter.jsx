import { Component } from 'react'
import css from './Filter.module.css'

export class Filter extends Component {
  render() {
    const { filter, addFilter } = this.props;
    return (
      <div className={css.filter}>
        <input
          type="text"
          name="filter"
          className={css.filter__input}
          value={filter}
          onChange={addFilter}
          placeholder="Enter name"
        />
      </div>
    );
  }
}