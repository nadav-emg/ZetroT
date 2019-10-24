import IReadController = require("./../ReadController");
import IWriteController = require("./../WriteController");
import IBaseBusiness = require("../../../Business/interfaces/base/BaseBusiness");

interface IBaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController{


}
export = IBaseController;