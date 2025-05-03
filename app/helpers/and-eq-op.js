import { helper } from '@ember/component/helper';

export default helper(function andEqOp([cycle,cycleValue,timeUnit,unitValue]) {
  if(cycle === cycleValue && timeUnit === unitValue){
    return true;
  }
  else{
    return false;
  }
});
