import { interval } from "rxjs";
import { shareReplay } from "rxjs/operators";

// Số lượng tối đa các giá trị trước đó đã lưu trữ trong replay buffer được trả về
// Ví dụ: Với mỗi 3s internal fn sẽ trigger 1 value mới => sau 15s sẽ có 5 value mới [0, 1, 2, 3, 4]
// Với buffer là 2 thì observer 3 sẽ chỉ nhận được 2 giá trị mới nhất là [3, 4]
const bufferSize = 2;

// If true, refCount = 0 will unsubscribe observable
// Default = false, will listen forever
const refCount = false;

// là thời gian tối đa mà replay buffer tồn tại, nếu vượt quá sẽ tạo ra replay buffer mới
const windowTime = 4000;

const shareReplyRequest$ = interval(3000).pipe(
  shareReplay(bufferSize, windowTime)
);

shareReplyRequest$.subscribe((value) => console.log("observer 1: ", value));

shareReplyRequest$.subscribe((value) => console.log("observer 2: ", value));

setTimeout(() => {
  shareReplyRequest$.subscribe((value) => console.log("observer 3: ", value));
}, 15000);
