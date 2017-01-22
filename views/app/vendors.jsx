import React from 'react';
import { connect } from 'react-redux';
import { getVisibleTransactions, getVendors } from 'reducers';


class Vendors extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  render(){
    if(this.props.isFetching) return(<div>Loading...</div>);
    return (
      <VendorTable vendors={this.props.vendors}
                   deleteVendor={this.props.deleteVendor}
                   categories={this.props.categories}
                   changeCategory={this.props.changeCategory}
                   sort={this.props.sort} />
    );
  }
}
const mapStateToProps = (state, props) => ({
  isFetching: state.isFetchingTransactions,
  transactions: getVisibleTransactions(state, props),
  categories: state.categories,
  vendors: getVendors(state, props),
});
//const mapDispatchToProps = (dispatch) => ({ onTodoClick(id){ dispatch(toggleTodo(id)) }, });
Vendors = connect(mapStateToProps)(Vendors);

export default Vendors;

const VendorTable = (props) => (
  <table className="Vendors">
    <thead>
    <tr>
      <th onClick={props.sort.bind(this)}>Vendor</th>
      <th onClick={props.sort.bind(this)}>Count</th>
      <th onClick={props.sort.bind(this)}>Total</th>
      <th onClick={props.sort.bind(this)}>Category</th>
      <th>Deleted</th>
    </tr>
    </thead>
    <tbody>
    {props.vendors.map(v => <VendorRow key={v.vendor}
                                       vendor={v}
                                       deleteVendor={props.deleteVendor}
                                       categories={props.categories}
                                       changeCategory={props.changeCategory} />)}
    </tbody>
  </table>
);

const VendorRow = (props) => (
  <tr>
    <td>{props.vendor.vendor}</td>
    <td>{props.vendor.count}</td>
    <td>{props.vendor.total}</td>
    <td><CategorySelect categories={props.categories} vendor={props.vendor} /></td>
    <td>
      <span className="button" id={props.vendor.vendor} onClick={props.deleteVendor.bind(this)}>
        delete
      </span>
    </td>
  </tr>
);

const CategorySelect = (props) => (
  <select value={props.vendor.category ? props.vendor.category : ''}
          onChange={(e) => props.changeCategory(props.vendor.vendor, e.target.value)}>
    <option></option>
    {props.categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
  </select>
);
