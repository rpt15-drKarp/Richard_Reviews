import http from "k6/http";
import { check } from "k6";

export let options = {
  rps: 1000,
  vus: 10,
  duration: "15s"
};

export default function() {
  let newReview = [];
  newReview.push(100);
  newReview.push('The fun game')
  newReview.push('Rich Chigga');
  newReview.push(Math.floor(Math.random() * (100000 - 10000 + 1)));
  newReview.push(432421);
  newReview.push('2017-01-01');
  newReview.push(63456);
  newReview.push('Nihil deleniti magnam minima aut modi esse expedita ullam. Error deleniti recusandae optio dolorem in dicta quia maiores. Consectetur distinctio deleniti odit.');
  newReview.push(true);
  newReview.push(72451);
  newReview.push(528548);
  newReview.push(2343);
  newReview.push(6375468);
  newReview.push('http://robohash.org/set_set1/bgset_bg2/kQqaIfGqxsjFoNIT');
  // newReview.push(100);


  let res = http.post(`http://localhost:3001/api/reviews/`, {review: JSON.stringify(newReview)});
  check(res, {
    "Success get": (r) => r.status == 200
  });
};