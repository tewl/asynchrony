"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var CombinedStream = /** @class */ (function (_super) {
    __extends(CombinedStream, _super);
    function CombinedStream() {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this._streams = streams;
        _this.on("pipe", function (source) {
            source.unpipe(_this);
            var streamEnd = source;
            for (var _i = 0, _a = _this._streams; _i < _a.length; _i++) {
                var curStream = _a[_i];
                streamEnd = streamEnd.pipe(curStream);
            }
            _this._streamEnd = streamEnd;
        });
        return _this;
    }
    CombinedStream.prototype.pipe = function (dest, options) {
        if (!this._streamEnd) {
            throw new Error("Internal error: combinedStream.pipe() called before 'pipe' event.");
        }
        return this._streamEnd.pipe(dest, options);
    };
    return CombinedStream;
}(stream_1.PassThrough));
exports.CombinedStream = CombinedStream;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21iaW5lZFN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBK0Q7QUFFL0Q7SUFBb0Msa0NBQVc7SUFLM0M7UUFBWSxpQkFBeUI7YUFBekIsVUFBeUIsRUFBekIscUJBQXlCLEVBQXpCLElBQXlCO1lBQXpCLDRCQUF5Qjs7UUFBckMsWUFFSSxpQkFBTyxTQWVWO1FBZEcsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFFeEIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxNQUFnQjtZQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxDQUFDO1lBRXBCLElBQUksU0FBUyxHQUFXLE1BQU0sQ0FBQztZQUUvQixLQUF3QixVQUFhLEVBQWIsS0FBQSxLQUFJLENBQUMsUUFBUSxFQUFiLGNBQWEsRUFBYixJQUFhO2dCQUFoQyxJQUFNLFNBQVMsU0FBQTtnQkFFaEIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBcUIsQ0FBQyxDQUFDO2FBQ3JEO1lBRUQsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7O0lBQ1AsQ0FBQztJQUVNLDZCQUFJLEdBQVgsVUFBNkMsSUFBTyxFQUFFLE9BQTRCO1FBRTlFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztTQUN4RjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTCxxQkFBQztBQUFELENBaENBLEFBZ0NDLENBaENtQyxvQkFBVyxHQWdDOUM7QUFoQ1ksd0NBQWMiLCJmaWxlIjoiY29tYmluZWRTdHJlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bhc3NUaHJvdWdoLCBSZWFkYWJsZSwgV3JpdGFibGUsIFN0cmVhbX0gZnJvbSBcInN0cmVhbVwiO1xuXG5leHBvcnQgY2xhc3MgQ29tYmluZWRTdHJlYW0gZXh0ZW5kcyBQYXNzVGhyb3VnaFxue1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3N0cmVhbXM6IEFycmF5PFN0cmVhbT47XG4gICAgcHJpdmF0ZSBfc3RyZWFtRW5kOiBTdHJlYW0gfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5zdHJlYW1zOiBBcnJheTxTdHJlYW0+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3RyZWFtcyA9IHN0cmVhbXM7XG5cbiAgICAgICAgdGhpcy5vbihcInBpcGVcIiwgKHNvdXJjZTogUmVhZGFibGUpID0+IHtcbiAgICAgICAgICAgIHNvdXJjZS51bnBpcGUodGhpcyk7XG5cbiAgICAgICAgICAgIGxldCBzdHJlYW1FbmQ6IFN0cmVhbSA9IHNvdXJjZTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBjdXJTdHJlYW0gb2YgdGhpcy5fc3RyZWFtcylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdHJlYW1FbmQgPSBzdHJlYW1FbmQucGlwZShjdXJTdHJlYW0gYXMgV3JpdGFibGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9zdHJlYW1FbmQgPSBzdHJlYW1FbmQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwaXBlPFQgZXh0ZW5kcyBOb2RlSlMuV3JpdGFibGVTdHJlYW0+KGRlc3Q6IFQsIG9wdGlvbnM/OiB7IGVuZD86IGJvb2xlYW47IH0pOiBUXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuX3N0cmVhbUVuZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW50ZXJuYWwgZXJyb3I6IGNvbWJpbmVkU3RyZWFtLnBpcGUoKSBjYWxsZWQgYmVmb3JlICdwaXBlJyBldmVudC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVhbUVuZC5waXBlKGRlc3QsIG9wdGlvbnMpO1xuICAgIH1cblxufVxuIl19
