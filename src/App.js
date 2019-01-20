import React, { Component } from 'react';
import './App.css';

class App extends Component {
 constructor(props) {
  super(props);
  this.state = {
    items: [
        {
          name: 'item1',
          itemId: 1,
          checked: false
        }
      ],
      newItemName: ''
    };
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
  };

  handleChange(e) {
    this.setState({
      newItemName: e.target.value
    });
  };

  addItem(e) {
    let nextIndex = this.state.items[this.state.items.length - 1].itemId + 1;
    let newItem = {
      name: this.state.newItemName,
      itemId: nextIndex,
      checked: false
    };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
    e.preventDefault();
    this.refs.form.reset();
  };

  toggleChecked(itemId) {
    console.log('ToggleChecked ItemID', itemId);
    let targetItem = this.state.items.filter(item => item.itemId === itemId)[0]
    targetItem.checked = !targetItem.checked;
    this.setState({
      items: this.state.items.map(item => (item.itemId === itemId) ? targetItem : item)
    });
  }

  render() {
    console.log('RenderState:', this.state.items);
    const listAllItems = this.state.items.map((item, i) => {
      return (
        <li key={i}>
          <p className={(item.checked) ? 'active' : 'non-active'}>{item.name}</p>
          <button onClick={() => this.toggleChecked(item.itemId)}>Toggle Checked</button>
        </li>
      )
    });

    return(
      <div className="App">
      <h1>List of Items</h1>
        <form ref="form" onSubmit={this.addItem}>
          <input type="text" name="addItems" value={this.state.newItemName} onChange={this.handleChange}/>
          <button type="submit">Add an item</button>  
        </form>
        <ul>
          {listAllItems}
        </ul>
      </div>
    )
  }
}
 
export default App;