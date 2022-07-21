const queryStatements = {
  getListQuery: ({year, month}) => `
    select ACCOUNT_HISTORY.id as id
     , ACCOUNT_HISTORY.dateString as dateString
     , ACCOUNT_HISTORY.categoryId as categoryId
     , ACCOUNT_HISTORY_CATEGORY.title as categoryTitle
     , ACCOUNT_HISTORY_CATEGORY.type as categoryType
     , ACCOUNT_HISTORY.description as description
     , ACCOUNT_HISTORY.paymentId as paymentId
     , PAYMENT.title as paymentTitle
     , ACCOUNT_HISTORY.price as price 
    from ACCOUNT_HISTORY 
    left outer join PAYMENT 
    on ACCOUNT_HISTORY.paymentId = PAYMENT.id
    join ACCOUNT_HISTORY_CATEGORY 
    on ACCOUNT_HISTORY.categoryId = ACCOUNT_HISTORY_CATEGORY.id 
    where ACCOUNT_HISTORY.dateString like "${year}.${month}.__"
    order by ACCOUNT_HISTORY.dateString DESC;
    `,
};

module.exports = queryStatements;
