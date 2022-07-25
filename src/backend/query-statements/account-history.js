const queryStatements = {
  getListQuery: ({year, month, categoryId}) => `
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
    ${categoryId === undefined ? '' : `and ACCOUNT_HISTORY.categoryId = ${categoryId}`}
    order by ACCOUNT_HISTORY.dateString DESC;
    `,

  createHistoryQuery: () =>
    `insert into ACCOUNT_HISTORY (dateString, categoryId, description, paymentId, price) values (?, ?, ?, ?, ?);`,

  updateHistoryQuery: () =>
    `update ACCOUNT_HISTORY SET dateString=?, categoryId=?, description=?, paymentId=?, price=? WHERE id=?;`,

  getCategoriesQuery: ({year, month}) => {
    const whereClause = year !== undefined && month !== undefined ? `where dateString like '${year}.${month}.__'` : '';

    return `select cate.type as type
                 , cate.id as id
                 , cate.title
                 , case when cate.type = 'income' then ifnull(sum(h.price) * 100 / (select sum(price) 
                                                                               from ACCOUNT_HISTORY h 	                                             
                                                                              inner join ACCOUNT_HISTORY_CATEGORY c
                                                                                 on h.categoryId = c.id
                                                                                and c.type = 'income' 
                                                                                ${whereClause}
                                                                                   ), 0)
                       else ifnull(sum(h.price) * 100 / (select sum(price) 
                                                     from ACCOUNT_HISTORY h 	                                             
                                                    inner join ACCOUNT_HISTORY_CATEGORY c
                                                       on h.categoryId = c.id
                                                      and c.type = 'expenditure' 
                                                      ${whereClause}
                                                        ), 0)
                       end as percentage
    , case when cate.type = 'income' then
    											(select hc.tot
    											  from (
      											  select c.id as id, sum(price) as tot
                                             from ACCOUNT_HISTORY h
                                            inner join ACCOUNT_HISTORY_CATEGORY c
                                               on h.categoryId = c.id
                                              and c.type = 'income'
                                               ${whereClause}
                                              group by c.id
    											  )hc												where hc.id = cate.id)
    											 
          else (select hc.tot
    											  from (
      											  select c.id as id, sum(price) as tot
                                             from ACCOUNT_HISTORY h
                                            inner join ACCOUNT_HISTORY_CATEGORY c
                                               on h.categoryId = c.id
                                              and c.type = 'expenditure'
                                               ${whereClause}
                                              group by c.id
    											  )hc												where hc.id = cate.id)
      end as total          
 from ACCOUNT_HISTORY_CATEGORY as cate
 left join ACCOUNT_HISTORY as h
   on h.categoryId = cate.id
 ${whereClause}
group by cate.id 
order by type desc, id
`;
  },

  getPaymentsQuery: () => `select id, title from PAYMENT`,

  createPaymentQuery: () => `insert into PAYMENT (title) values (?);`,

  deletePaymentQuery: () => `delete from PAYMENT where id = ?;`,
};

module.exports = queryStatements;
