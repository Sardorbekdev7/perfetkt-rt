import { Cascader } from 'antd';
import './style/style.css';

const options = [
  {
    label: "O'zbek tili",
    value: "O'zbek tili",
  },
  {
    label: 'Ingliz tili',
    value: 'Ingliz tili',
  },
  {
    label: 'Rus tili',
    value: 'Rus tili',
  }
];

const options2 = [
  {
    label: "Dasturlash",
    value: "Dasturlash",
  },
  {
    label: 'Matematika',
    value: 'Matematika',
  },
  {
    label: 'Fizika',
    value: 'Fizika',
  }
];

const options3 = [
  {
    label: "Dasturlash",
    value: "Dasturlash",
  },
  {
    label: 'Matematika',
    value: 'Matematika',
  },
  {
    label: 'Fizika',
    value: 'Fizika',
  }
];

const onChange = (value) => {
  console.log(value);
};


const Filter = () => {
  return (
    <div className='filter'> 
      <div className='filter-menu'>
        <Cascader
          style={{
            width: '30%',
          }}
          options={options}
          onChange={onChange}
          multiple
          maxTagCount="responsive"
          placeholder="Tillar"
        />
        <Cascader
          style={{
            width: '30%',
          }}
          options={options2}
          onChange={onChange}
          multiple
          maxTagCount="responsive"
          placeholder="Soha"
        />
        <Cascader
          style={{
            width: '30%',
          }}
          options={options3}
          onChange={onChange}
          multiple
          maxTagCount="responsive"
          placeholder="Fan"
        />
      </div>
    </div>
  )
}

export default Filter