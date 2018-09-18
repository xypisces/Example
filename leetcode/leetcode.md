## 两数之和
给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
- example
```
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```
- Js版本
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let arr = [];
    for(let i=0; i<nums.length; i++){
      const idx = nums.indexOf(target - nums[i])
        if( idx !== -1 && idx !== i){  //需要不等于其自身
            arr[0] = i
            arr[1] = idx
            break;
        }
    }
    return arr
}
```

