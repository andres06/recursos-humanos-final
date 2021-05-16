const controller = {};

controller.list =  (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT *FROM usuarios', (err, usuarios) => {
            if(err) {
                res.json(err);
            }
            res.render('index', {
                data: usuarios
            });
        });
    });
            
};



controller.inicio =  (req, res) => {
    res.render('login')
    
};


controller.guardar = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuarios set ?' , [data], (err, usuarios) => {
            console.log(usuarios);
            res.redirect('list');
        });
    });
};

controller.eliminar = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuarios WHERE id = ?', [id], (err, rows) => {
            res.redirect('/list');
        });
    });
};

controller.editar = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, usuarios) => {
            res.render('editar', {
                data: usuarios[0]
            });
        });
    });
};

controller.actualizar = (req, res) => {
    const { id } = req.params;
    const editado = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE usuarios SET ? WHERE id = ?', [editado, id], (err, usuarios) => {
            res.redirect('/list');
            });
        });
    };

    controller.registrar =  (req, res) => {
        res.render('registro')
        
    };



    
module.exports = controller;

