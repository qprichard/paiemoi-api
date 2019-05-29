/* Class to provide a controller to a model passed in params */

class ControllerProvider {
  constructor(Model) {
    this._Model = Model;
  }

  //get All instances of a model
  async all(req, res) {
    try {
      const list = await this._Model.all()
      return list;
    } catch (err){
      throw err
    }
  }

  //retrieve one instance of the this._Model by the id pased in url
  async getById(req, res) {
    try {
      const { id } = req.params;
      let instance = null;
      if(!id) {
        instance = await this._Model.get({});
      } else {
        instance = await this._Model.get({ id })
      }
      return instance;
    } catch (err) {
      throw err
    }
  }

  //retrieve all instances matching the informations
  async get(req, res) {
    try {
      const body= req.body;
      const list = await this._Model.get(body)
      return list;
    } catch (err) {
      throw err
    }
  }

  //create a single or many instance(s) of the Model
  async add(req, res) {
    try {
      const { instances } = req.body;

      //insert a single object
      if(!instances) {
        const model = new this._Model(req.body);
        return model.save();
      }

      //insert multiple objects
      const models = instances.map( instance => new this._Model(instance))
      return await this._Model.insertMany(models)
    } catch (err) {
      throw err
    }
  }

  //update single or multiple instance(s) of the Model
  async update(req, res) {
    try {
      //update a single model by its id
      const { id } = req.params;
      if(id) {
        const instance = await this._Model.get({ id });
        Object.keys(req.body).forEach( param => { instance[0][param] = req.body[param] });
        return await this._Model.updateMany(instance);
      }

      const { instances } = req.body;

      if(!instances) {
        throw new Error("instances is required in body or :id in url");
      }

      //update multiple models by ids in body
      const models = await this._Model.get({
        id: { $in: instances.map(({ id }) => id ) }
      })

      const updatedModels = models.map( model => {
        const { id, ...params } = instances.find(({ id }) => id == model.id );
        Object.keys(params).forEach(
          param => { model[param] = params[param] }
        );
        return model;
      });

      return await this._Model.updateMany(updatedModels);
    } catch (err) {
      throw err
    }
  }

  //delete a single or many instance(s) by id in url or instances in body
  async delete(req, res){
    try {
      //delete by id in the url
      const { id } = req.params;
      if(id) {
        const instance = await this._Model.get({id});
        return this._Model.delete(instance);
      }

      //delete all instances which have their id in the body
      const { instances } = req.body;
      if(!instances) {
        throw new Error("instances is required in body");
      }
      const toDelete = await this._Model.get({
        id: { $in: instances.map(id => id ) }
      });

      const deleted = await this._Model.delete(toDelete);
      return deleted;
    } catch(err) {
      throw err
    }
  }
}

module.exports = ControllerProvider;
