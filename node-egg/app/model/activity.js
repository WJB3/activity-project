module.exports = (app) => {
    const { STRING, INTEGER, DATE, Now } = app.Sequelize;
    const Activity = app.model.define(
        "activity",
        {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: STRING,
            content: STRING,
            type_id: INTEGER,
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "blog_content"
        }
    );
    return Activity;
};