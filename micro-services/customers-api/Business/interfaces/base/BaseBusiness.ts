import IRead = require("./../common/Read");
import IWrite = require("./../common/Write");
interface IBaseBusiness<T> extends IRead<T>, IWrite<T>
{
}
export = IBaseBusiness;