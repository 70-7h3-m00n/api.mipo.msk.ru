'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { getData, getDataProps } = require('../../../helpers')
const {
  program
} = require('../../get-static-props/controllers/get-static-props')

module.exports = {
  studyFields: async () => {
    const programs = await getData({
      query: getDataProps.query.program,
      select: getDataProps.select.program.pathsStudyFields,
      populate: getDataProps.populate.program.studyFieldSlugs
    })

    const paths = Array.from(
      new Set(programs.map(program => program.study_field?.slug))
    ).map(slug => ({
      params: { studyFieldSlug: slug || 'study_field' }
    }))

    return paths
  },
  studyFieldsCourse: async () => {
    const programs = await getData({
      query: getDataProps.query.program,
      select: getDataProps.select.program.pathsStudyFields,
      populate: getDataProps.populate.program.studyFieldSlugs
    })

    const paths = Array.from(
      new Set(
        programs.map(program => ({
          slug: program.study_field?.slug,
          type: program.category?.type
        }))
      )
    )
      .filter(program => program.category?.type.toLowerCase() === 'course')
      .map(({ slug }) => ({
        params: { studyFieldSlug: slug || 'study_field' }
      }))

    return paths
  },
  studyFieldsProfession: async () => {
    const programs = await getData({
      query: getDataProps.query.program,
      select: getDataProps.select.program.pathsStudyFields,
      populate: getDataProps.populate.program.studyFieldSlugs
    })

    const paths = programs
      .filter(
        program =>
          program && program.category?.type?.toLowerCase() === 'profession'
      )
      .map(({ study_field }) => ({
        params: { studyFieldSlug: study_field?.slug || 'study_field' }
      }))

    return paths
  },
  studyFieldsMBA: async () => {
    const programs = await getData({
      query: getDataProps.query.program,
      select: getDataProps.select.program.pathsStudyFields,
      populate: getDataProps.populate.program.studyFieldSlugs
    })

    const paths = programs
      .filter(program => program.category?.type.toLowerCase() === 'mba')
      .map(({ study_field }) => ({
        params: { studyFieldSlug: study_field.slug || 'study_field' }
      }))

    return paths
  },
  programs: async () => {
    const programs = await getData({
      query: getDataProps.query.program,
      select: getDataProps.select.program.pathsPrograms,
      populate: getDataProps.populate.program.studyFieldSlugs
    })

    const paths = programs.map(({ study_field, slug }) => ({
      params: { slug, studyFieldSlug: study_field?.slug || 'study_field' }
    }))

    return paths
  },
  programsCourse: async () => {
    const programs = await getData({
      query: getDataProps.query.program,
      select: getDataProps.select.program.pathsPrograms,
      populate: getDataProps.populate.program.studyFieldSlugs
    })

    const paths = programs
      .filter(program => program.category?.type.toLowerCase() === 'course')
      .map(({ study_field, slug }) => ({
        params: { slug, studyFieldSlug: study_field?.slug || 'study_field' }
      }))

    return paths
  },
  programsProfession: async () => {
    const programs = await getData({
      query: getDataProps.query.program,
      select: getDataProps.select.program.pathsPrograms,
      populate: getDataProps.populate.program.studyFieldSlugs
    })

    const paths = programs
      .filter(program => program.category?.type.toLowerCase() === 'profession')
      .map(({ study_field, slug }) => ({
        params: { slug, studyFieldSlug: study_field?.slug || 'study_field' }
      }))

    return paths
  },
  programsMBA: async () => {
    const programs = await getData({
      query: getDataProps.query.program,
      select: getDataProps.select.program.pathsPrograms,
      populate: getDataProps.populate.program.studyFieldSlugs
    })

    const paths = programs
      .filter(program => program.category?.type.toLowerCase() === 'mba')
      .map(({ study_field, slug }) => ({
        params: { slug, studyFieldSlug: study_field?.slug || 'study_field' }
      }))

    return paths
  }
}
