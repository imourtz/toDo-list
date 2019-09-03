import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      tasks: [],
      completed: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    const newTasks = [...this.state.tasks];
    newTasks.unshift(this.state.inputValue);
    this.setState({inputValue: '',tasks: newTasks});
    const storeString = JSON.stringify(newTasks);
    localStorage.setItem('tasksHistory', storeString)
  }

  deleteItem(index) {
    const items = [...this.state.tasks]
    items.splice(index,1)
    this.setState({tasks: items})
    const itemsString = JSON.stringify(items);
    localStorage.setItem('tasksHistory', itemsString)
  }
  
  componentDidMount() {
    const storage = localStorage.getItem('tasksHistory');
    const storageArray = JSON.parse(storage) || [];
    this.setState({tasks: storageArray})
  }

  handleClear() {
    this.setState({tasks: [], completed:0})
    localStorage.clear('tasksHistory');
  }

  handleCheck(e) {
    let total = this.state.completed;
    if (e.target.checked) {
      total += 1
    }else {
      total -=1
    }
    this.setState({completed: total})
  }
  

  render() {
    return (
      <div className="container">
        <div className="jumbotron bg-secondary">
          <h1 className="display-4">Your "To-Do" List</h1>
          <div className="input-group mb-3">
            <input className="form-control" type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="Insert Task" />
            <div className="input-group-append">
              <button className="btn btn-dark" type="submit" onClick={this.handleClick}>ADD</button>
            </div>
          </div>
        </div>
        <div>
          <ul>
            {this.state.tasks.map((item, index) =>{
              return (
                <div key={index}>
                  <div className="row">
                    <hr className="my-4" />
                    <div className="col">
                      <input onChange={this.handleCheck} className="form-check-input" type="checkbox"/>
                    </div>
                    <div className="col-6">
                      <li>{item}</li>
                    </div>
                    <div className="col">
                      <button type="submit" className="btn btn-outline-danger" onClick={this.deleteItem.bind(this,index)}>REMOVE</button>
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>   
              )
            })}
          </ul>
        </div> 
        <div className="row">
          <div className="col">Total Tasks: {this.state.tasks.length}</div>
          <div className="col-2">Completed Tasks: {this.state.completed}</div>
        </div>
        <div className="row justify-content-center clear">
          {this.state.tasks.length !==0 ? 
                <button type="submit" className="btn btn-dark clear-button" onClick={this.handleClear}>CLEAR LIST</button>
            : null}
        </div>
      </div>
    )
  }
}

export default App;

