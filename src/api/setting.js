import request from '@/utils/request'
//根据id查询企业
export function findCompanyApi(companyId){
    return request({
        url: `/company/${companyId}`,
        method:'GET',
       
    })
}