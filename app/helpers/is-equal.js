import { helper } from '@ember/component/helper';

export default helper(function isEqual([fromModel,argument]) {
  return fromModel.toLowerCase() == argument.toLowerCase()? true:false;
});
